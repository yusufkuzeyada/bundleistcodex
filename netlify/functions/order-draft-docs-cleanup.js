const {
  getRequiredEnv,
  isValidUuid,
  jsonResponse,
  parseBearerToken,
  parseJsonResponse,
  readHeader,
} = require("./_shared");

const DEFAULT_TEMP_BUCKET = "order-draft-temp";
const LIST_PAGE_SIZE = 100;

function encodeStoragePath(pathValue) {
  return String(pathValue || "")
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

async function fetchAuthedUser({ supabaseUrl, serviceRoleKey, callerToken }) {
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${callerToken}`,
    },
  });
  const body = await parseJsonResponse(response);
  if (!response.ok || !body || !isValidUuid(body.id)) {
    return null;
  }
  return body;
}

async function fetchCustomerRole({ supabaseUrl, serviceRoleKey, userId }) {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/customers?select=role&id=eq.${encodeURIComponent(userId)}&limit=1`,
    {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    },
  );
  const body = await parseJsonResponse(response);
  if (!response.ok || !Array.isArray(body) || !body[0]) {
    return "";
  }
  return String(body[0].role || "").trim();
}

async function fetchOrder({ supabaseUrl, serviceRoleKey, orderId }) {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/orders?select=id,status,customer_id&id=eq.${encodeURIComponent(orderId)}&limit=1`,
    {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    },
  );
  const body = await parseJsonResponse(response);
  if (!response.ok || !Array.isArray(body)) {
    throw new Error("order_lookup_failed");
  }
  return body[0] || null;
}

async function listStorageObjects({
  supabaseUrl,
  serviceRoleKey,
  bucketName,
  prefix,
  offset = 0,
}) {
  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/list/${encodeURIComponent(bucketName)}`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        prefix,
        limit: LIST_PAGE_SIZE,
        offset,
        sortBy: { column: "name", order: "asc" },
      }),
    },
  );
  const body = await parseJsonResponse(response);
  if (!response.ok) {
    const message =
      body && typeof body === "object" && typeof body.message === "string"
        ? body.message
        : "storage_list_failed";
    throw new Error(message);
  }
  return Array.isArray(body) ? body : [];
}

function isFolderItem(item) {
  if (!item || typeof item !== "object") return false;
  if (item.id || item.updated_at || item.created_at || item.last_accessed_at) {
    return false;
  }
  return typeof item.name === "string" && item.name.trim() !== "";
}

async function collectObjectPaths({
  supabaseUrl,
  serviceRoleKey,
  bucketName,
  rootPrefix,
}) {
  const prefixes = [rootPrefix];
  const objectPaths = [];

  while (prefixes.length > 0) {
    const prefix = prefixes.pop();
    let offset = 0;

    for (;;) {
      const items = await listStorageObjects({
        supabaseUrl,
        serviceRoleKey,
        bucketName,
        prefix,
        offset,
      });

      if (items.length === 0) break;

      for (const item of items) {
        const rawName = typeof item.name === "string" ? item.name.trim() : "";
        if (!rawName) continue;
        const normalizedName = rawName.replace(/^\/+/, "");

        if (isFolderItem(item)) {
          const nestedPrefix = `${prefix}${normalizedName.replace(/\/+$/, "")}/`;
          prefixes.push(nestedPrefix);
          continue;
        }

        objectPaths.push(`${prefix}${normalizedName}`);
      }

      if (items.length < LIST_PAGE_SIZE) break;
      offset += LIST_PAGE_SIZE;
    }
  }

  return objectPaths;
}

async function deleteStorageObject({
  supabaseUrl,
  serviceRoleKey,
  bucketName,
  objectPath,
}) {
  const encodedPath = encodeStoragePath(objectPath);
  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/${encodeURIComponent(bucketName)}/${encodedPath}`,
    {
      method: "DELETE",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    },
  );
  const body = await parseJsonResponse(response);
  if (!response.ok) {
    const message =
      body && typeof body === "object" && typeof body.message === "string"
        ? body.message
        : "storage_delete_failed";
    throw new Error(message);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { code: "method_not_allowed" });
  }

  const callerToken = parseBearerToken(readHeader(event, "authorization"));
  if (!callerToken) {
    return jsonResponse(401, { code: "missing_auth" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { code: "invalid_json" });
  }

  const orderId = String(body.orderId || "").trim();
  if (!isValidUuid(orderId)) {
    return jsonResponse(400, { code: "invalid_order_id" });
  }

  let supabaseUrl;
  let serviceRoleKey;
  try {
    supabaseUrl = getRequiredEnv("SUPABASE_URL").replace(/\/+$/, "");
    serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  } catch (error) {
    console.error("order-draft-docs-cleanup: missing env:", error.message);
    return jsonResponse(500, { code: "server_misconfigured" });
  }

  const tempBucket = String(process.env.ORDER_DRAFT_TEMP_BUCKET || "").trim()
    || DEFAULT_TEMP_BUCKET;

  try {
    const caller = await fetchAuthedUser({
      supabaseUrl,
      serviceRoleKey,
      callerToken,
    });
    if (!caller) {
      return jsonResponse(401, { code: "invalid_auth" });
    }

    const role = await fetchCustomerRole({
      supabaseUrl,
      serviceRoleKey,
      userId: caller.id,
    });
    if (role !== "admin") {
      return jsonResponse(403, { code: "forbidden" });
    }

    const order = await fetchOrder({ supabaseUrl, serviceRoleKey, orderId });
    if (!order) {
      return jsonResponse(404, { code: "order_not_found" });
    }

    const status = String(order.status || "").trim();
    if (status !== "Processing") {
      return jsonResponse(409, {
        code: "order_not_processing",
        currentStatus: status || null,
      });
    }

    const prefix = `${orderId}/`;
    const objectPaths = await collectObjectPaths({
      supabaseUrl,
      serviceRoleKey,
      bucketName: tempBucket,
      rootPrefix: prefix,
    });

    let deletedCount = 0;
    for (const objectPath of objectPaths) {
      await deleteStorageObject({
        supabaseUrl,
        serviceRoleKey,
        bucketName: tempBucket,
        objectPath,
      });
      deletedCount += 1;
    }

    return jsonResponse(200, {
      code: "ok",
      orderId,
      bucket: tempBucket,
      prefix,
      deletedCount,
    });
  } catch (error) {
    console.error("order-draft-docs-cleanup: unexpected error", error);
    return jsonResponse(500, {
      code: "cleanup_failed",
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};

