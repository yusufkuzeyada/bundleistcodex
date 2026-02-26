const DEFAULT_READ_RETENTION_DAYS = 21;
const DEFAULT_UNREAD_RETENTION_DAYS = 75;
const DEFAULT_BATCH_SIZE = 5000;
const DEFAULT_MAX_BATCHES = 10;

const READ_RETENTION_MIN = 14;
const READ_RETENTION_MAX = 30;
const UNREAD_RETENTION_MIN = 60;
const UNREAD_RETENTION_MAX = 90;
const BATCH_SIZE_MIN = 500;
const BATCH_SIZE_MAX = 10000;
const MAX_BATCHES_MIN = 1;
const MAX_BATCHES_MAX = 50;

exports.config = {
  schedule: "15 2 * * *",
};

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

function parseIntOrFallback(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function readHeader(headers, name) {
  if (!headers || typeof headers !== "object") return "";
  const direct = headers[name];
  if (typeof direct === "string") return direct;
  const lower = headers[name.toLowerCase()];
  return typeof lower === "string" ? lower : "";
}

function isScheduledInvocation(event) {
  const eventHeader = readHeader(event.headers, "x-nf-event");
  return eventHeader.toLowerCase() === "schedule";
}

function hasValidManualSecret(event, secret) {
  if (!secret) return false;
  const provided = readHeader(event.headers, "x-notification-cleanup-secret");
  return provided && provided === secret;
}

function getConfig() {
  const supabaseUrlRaw = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrlRaw) {
    throw new Error("Missing required environment variable: SUPABASE_URL");
  }
  if (!serviceRoleKey) {
    throw new Error(
      "Missing required environment variable: SUPABASE_SERVICE_ROLE_KEY",
    );
  }

  const readRetentionDays = clamp(
    parseIntOrFallback(
      process.env.NOTIFICATION_READ_RETENTION_DAYS,
      DEFAULT_READ_RETENTION_DAYS,
    ),
    READ_RETENTION_MIN,
    READ_RETENTION_MAX,
  );

  const unreadRetentionDays = clamp(
    parseIntOrFallback(
      process.env.NOTIFICATION_UNREAD_RETENTION_DAYS,
      DEFAULT_UNREAD_RETENTION_DAYS,
    ),
    UNREAD_RETENTION_MIN,
    UNREAD_RETENTION_MAX,
  );

  const batchSize = clamp(
    parseIntOrFallback(
      process.env.NOTIFICATION_CLEANUP_BATCH_SIZE,
      DEFAULT_BATCH_SIZE,
    ),
    BATCH_SIZE_MIN,
    BATCH_SIZE_MAX,
  );

  const maxBatchesPerRun = clamp(
    parseIntOrFallback(
      process.env.NOTIFICATION_CLEANUP_MAX_BATCHES,
      DEFAULT_MAX_BATCHES,
    ),
    MAX_BATCHES_MIN,
    MAX_BATCHES_MAX,
  );

  return {
    supabaseUrl: supabaseUrlRaw.replace(/\/+$/, ""),
    serviceRoleKey,
    readRetentionDays,
    unreadRetentionDays,
    batchSize,
    maxBatchesPerRun,
  };
}

async function callCleanupBatch(config) {
  const response = await fetch(
    `${config.supabaseUrl}/rest/v1/rpc/cleanup_old_notifications`,
    {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        read_retention_days: config.readRetentionDays,
        unread_retention_days: config.unreadRetentionDays,
        batch_size: config.batchSize,
      }),
    },
  );

  const raw = await response.text();
  let payload = null;
  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = raw;
    }
  }

  if (!response.ok) {
    throw new Error(
      `cleanup_old_notifications RPC failed (${response.status}): ${
        typeof payload === "string" ? payload : JSON.stringify(payload)
      }`,
    );
  }

  if (typeof payload === "number") {
    return payload;
  }

  if (payload && typeof payload.cleanup_old_notifications === "number") {
    return payload.cleanup_old_notifications;
  }

  if (
    Array.isArray(payload) &&
    payload.length > 0 &&
    typeof payload[0] === "object" &&
    payload[0] !== null &&
    typeof payload[0].cleanup_old_notifications === "number"
  ) {
    return payload[0].cleanup_old_notifications;
  }

  throw new Error(
    `Unexpected cleanup_old_notifications response shape: ${JSON.stringify(payload)}`,
  );
}

exports.handler = async (event) => {
  const scheduled = isScheduledInvocation(event);
  const manualSecret = process.env.NOTIFICATION_CLEANUP_SECRET || "";
  const manualAuthorized = hasValidManualSecret(event, manualSecret);

  if (!scheduled && !manualAuthorized) {
    return jsonResponse(401, {
      code: "unauthorized",
      message:
        "Manual invocation requires x-notification-cleanup-secret header.",
    });
  }

  let config;
  try {
    config = getConfig();
  } catch (error) {
    console.error("notification-retention-cleanup: config error:", error);
    return jsonResponse(500, { code: "server_misconfigured" });
  }

  try {
    let deletedTotal = 0;
    let deletedLastBatch = 0;
    let batchesExecuted = 0;

    do {
      deletedLastBatch = await callCleanupBatch(config);
      deletedTotal += deletedLastBatch;
      batchesExecuted += 1;
    } while (
      deletedLastBatch >= config.batchSize &&
      batchesExecuted < config.maxBatchesPerRun
    );

    return jsonResponse(200, {
      ok: true,
      invocation: scheduled ? "schedule" : "manual",
      readRetentionDays: config.readRetentionDays,
      unreadRetentionDays: config.unreadRetentionDays,
      batchSize: config.batchSize,
      maxBatchesPerRun: config.maxBatchesPerRun,
      batchesExecuted,
      deleted: deletedTotal,
      saturated: deletedLastBatch >= config.batchSize,
    });
  } catch (error) {
    console.error("notification-retention-cleanup: run failed:", error);
    return jsonResponse(500, {
      code: "cleanup_failed",
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
