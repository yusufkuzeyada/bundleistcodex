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

async function parseJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
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
    console.error("admin-delete-user: missing env:", error.message);
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
      console.error("admin-delete-user: admin role lookup failed", adminCheckBody);
      return jsonResponse(500, { code: "admin_check_failed" });
    }
    const role = adminCheckBody[0] && adminCheckBody[0].role;
    if (role !== "admin") {
      return jsonResponse(403, { code: "forbidden" });
    }

    const deleteResponse = await fetch(
      `${supabaseUrl}/auth/v1/admin/users/${encodeURIComponent(userId)}`,
      {
        method: "DELETE",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "content-type": "application/json",
        },
      },
    );

    if (deleteResponse.status === 404) {
      // Already gone is safe for rollback semantics.
      return jsonResponse(200, { ok: true, deleted: false });
    }

    if (!deleteResponse.ok) {
      const deleteBody = await parseJson(deleteResponse);
      console.error("admin-delete-user: delete failed", deleteBody);
      return jsonResponse(500, { code: "delete_failed" });
    }

    return jsonResponse(200, { ok: true, deleted: true });
  } catch (error) {
    console.error("admin-delete-user: unexpected error", error);
    return jsonResponse(500, { code: "unexpected_error" });
  }
};
