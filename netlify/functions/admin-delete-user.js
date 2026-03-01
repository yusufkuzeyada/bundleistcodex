const {
  getRequiredEnv,
  isValidUuid,
  jsonResponse,
  parseBearerToken,
  parseJsonResponse,
  readHeader,
} = require("./_shared");

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
  if (!isValidUuid(userId)) {
    return jsonResponse(400, { code: "invalid_user_id" });
  }

  const callerToken = parseBearerToken(readHeader(event, "authorization"));
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
    const caller = await parseJsonResponse(userResponse);
    const callerId = caller && caller.id;
    if (!isValidUuid(callerId)) {
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
    const adminCheckBody = await parseJsonResponse(adminCheckResponse);
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
      const deleteBody = await parseJsonResponse(deleteResponse);
      console.error("admin-delete-user: delete failed", deleteBody);
      return jsonResponse(500, { code: "delete_failed" });
    }

    return jsonResponse(200, { ok: true, deleted: true });
  } catch (error) {
    console.error("admin-delete-user: unexpected error", error);
    return jsonResponse(500, { code: "unexpected_error" });
  }
};
