const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
    body: JSON.stringify(payload),
  };
}

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseBearerToken(authorizationHeader) {
  if (typeof authorizationHeader !== "string") {
    return "";
  }
  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
}

function readHeader(event, headerName) {
  if (!event || !event.headers || !headerName) {
    return "";
  }
  const headers = event.headers;
  if (typeof headers[headerName] === "string") {
    return headers[headerName].trim();
  }
  const normalized = String(headerName).toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (String(key || "").toLowerCase() === normalized) {
      return typeof value === "string" ? value.trim() : "";
    }
  }
  return "";
}

async function parseJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function resolveRequestOrigin(event) {
  const host =
    readHeader(event, "x-forwarded-host") || readHeader(event, "host");
  if (!host) {
    return "";
  }
  const forwardedProto = readHeader(event, "x-forwarded-proto");
  const candidate = String(forwardedProto || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  let protocol = candidate;
  if (protocol !== "http" && protocol !== "https") {
    const hostLower = host.toLowerCase();
    protocol =
      hostLower.includes("localhost") || hostLower.startsWith("127.0.0.1")
        ? "http"
        : "https";
  }
  return `${protocol}://${host}`;
}

function resolveRedirectTo(event, requestedValue) {
  const origin = resolveRequestOrigin(event);
  const fallback = origin ? new URL("/dashboard/", origin).toString() : "";
  const requested =
    typeof requestedValue === "string" ? requestedValue.trim() : "";
  if (!requested) {
    return fallback;
  }
  try {
    return origin
      ? new URL(requested, origin).toString()
      : new URL(requested).toString();
  } catch {
    return fallback;
  }
}

function extractActionLink(payload) {
  if (!payload || typeof payload !== "object") return "";
  const direct =
    payload.action_link ||
    payload.actionLink ||
    (payload.properties && payload.properties.action_link) ||
    (payload.properties && payload.properties.actionLink) ||
    (payload.data && payload.data.action_link) ||
    (payload.data && payload.data.actionLink);
  return typeof direct === "string" ? direct.trim() : "";
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { code: "method_not_allowed" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { code: "invalid_json" });
  }

  const userId = typeof body.userId === "string" ? body.userId.trim() : "";
  if (!UUID_PATTERN.test(userId)) {
    return jsonResponse(400, { code: "invalid_user_id" });
  }

  const callerToken = parseBearerToken(
    event.headers.authorization || event.headers.Authorization,
  );
  if (!callerToken) {
    return jsonResponse(401, { code: "missing_auth" });
  }

  let supabaseUrl;
  let serviceRoleKey;
  try {
    supabaseUrl = getRequiredEnv("SUPABASE_URL").replace(/\/+$/, "");
    serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  } catch (error) {
    console.error("admin-generate-magic-link: missing env:", error.message);
    return jsonResponse(500, { code: "server_misconfigured" });
  }

  try {
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${callerToken}`,
      },
    });
    if (!userResponse.ok) {
      return jsonResponse(401, { code: "invalid_auth" });
    }
    const caller = await parseJson(userResponse);
    const callerId = caller && caller.id;
    if (!UUID_PATTERN.test(callerId || "")) {
      return jsonResponse(401, { code: "invalid_auth" });
    }

    const adminCheckResponse = await fetch(
      `${supabaseUrl}/rest/v1/customers?select=role&id=eq.${encodeURIComponent(callerId)}&limit=1`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      },
    );
    const adminCheckBody = await parseJson(adminCheckResponse);
    if (!adminCheckResponse.ok || !Array.isArray(adminCheckBody)) {
      console.error(
        "admin-generate-magic-link: admin role lookup failed",
        adminCheckBody,
      );
      return jsonResponse(500, { code: "admin_check_failed" });
    }
    const role = adminCheckBody[0] && adminCheckBody[0].role;
    if (role !== "admin") {
      return jsonResponse(403, { code: "forbidden" });
    }

    const targetResponse = await fetch(
      `${supabaseUrl}/rest/v1/customers?select=id,email,role&id=eq.${encodeURIComponent(userId)}&limit=1`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      },
    );
    const targetBody = await parseJson(targetResponse);
    if (!targetResponse.ok || !Array.isArray(targetBody)) {
      console.error(
        "admin-generate-magic-link: customer lookup failed",
        targetBody,
      );
      return jsonResponse(500, { code: "target_lookup_failed" });
    }
    const target = targetBody[0];
    if (!target) {
      return jsonResponse(404, { code: "target_not_found" });
    }
    const targetEmail =
      typeof target.email === "string" ? target.email.trim() : "";
    if (!targetEmail) {
      return jsonResponse(400, { code: "target_missing_email" });
    }
    if (String(target.role || "customer") !== "customer") {
      return jsonResponse(400, { code: "target_not_customer" });
    }

    const redirectTo = resolveRedirectTo(event, body.redirectTo);
    const generatePayload = {
      type: "magiclink",
      email: targetEmail,
    };
    if (redirectTo) {
      generatePayload.redirect_to = redirectTo;
    }

    const generateResponse = await fetch(`${supabaseUrl}/auth/v1/admin/generate_link`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(generatePayload),
    });
    const generateBody = await parseJson(generateResponse);
    if (!generateResponse.ok) {
      console.error(
        "admin-generate-magic-link: generate_link failed",
        generateBody,
      );
      return jsonResponse(500, {
        code: "generate_link_failed",
        message:
          (generateBody &&
            (generateBody.msg ||
              generateBody.message ||
              generateBody.error_description ||
              generateBody.error)) ||
          "Supabase generate_link request failed.",
      });
    }

    const actionLink = extractActionLink(generateBody);
    if (!actionLink) {
      console.error(
        "admin-generate-magic-link: missing action link in response",
        generateBody,
      );
      return jsonResponse(500, { code: "generate_link_missing_action_link" });
    }

    return jsonResponse(200, {
      ok: true,
      userId,
      email: targetEmail,
      actionLink,
      redirectTo: redirectTo || null,
    });
  } catch (error) {
    console.error("admin-generate-magic-link: unexpected error", error);
    return jsonResponse(500, { code: "unexpected_error" });
  }
};
