const crypto = require("node:crypto");
const {
  getRequiredEnv,
  htmlResponse,
  jsonResponse,
  parseJsonResponse,
  readHeader,
} = require("./_shared");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(input) {
  if (typeof input !== "string") {
    return "";
  }
  return input.trim().toLowerCase();
}

function isValidEmail(email) {
  return EMAIL_PATTERN.test(email);
}

function getBaseUrl(event) {
  const configuredBaseUrl =
    process.env.PUBLIC_SITE_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.DEPLOY_URL;

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/+$/, "");
  }

  const proto = readHeader(event, "x-forwarded-proto") || "https";
  const host = readHeader(event, "x-forwarded-host") || readHeader(event, "host");

  if (!host) {
    throw new Error("Could not resolve request host for unsubscribe URL.");
  }

  return `${proto}://${host}`;
}

function createUnsubscribeSignature(email, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(email)
    .digest("hex");
}

function isValidUnsubscribeSignature(email, signature, secret) {
  if (!/^[a-f0-9]{64}$/i.test(signature)) {
    return false;
  }

  const expected = createUnsubscribeSignature(email, secret);
  const expectedBuffer = Buffer.from(expected, "hex");
  const providedBuffer = Buffer.from(signature, "hex");

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}

function getSupabaseConfig() {
  return {
    supabaseUrl: getRequiredEnv("SUPABASE_URL").replace(/\/+$/, ""),
    supabaseServiceRoleKey: getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    unsubscribeSecret: getRequiredEnv("NEWSLETTER_UNSUBSCRIBE_SECRET"),
  };
}

function getSubscribeConfig() {
  return {
    ...getSupabaseConfig(),
    resendApiKey: getRequiredEnv("RESEND_API_KEY"),
    newsletterFromEmail: getRequiredEnv("NEWSLETTER_FROM_EMAIL"),
  };
}

async function callSupabaseRest(config, path, options = {}) {
  const url = new URL(`/rest/v1/${path}`, config.supabaseUrl);
  if (options.searchParams) {
    for (const [key, value] of Object.entries(options.searchParams)) {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url.toString(), {
    method: options.method || "GET",
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      ...(options.headers || {}),
    },
    body: options.body,
  });

  const parsedBody = await parseJsonResponse(response);

  if (!response.ok) {
    const errorDetail =
      typeof parsedBody === "object" && parsedBody !== null
        ? JSON.stringify(parsedBody)
        : parsedBody || response.statusText;
    throw new Error(
      `Supabase REST request failed (${response.status}): ${errorDetail}`,
    );
  }

  return parsedBody;
}

async function subscriberExists(config, email) {
  const rows = await callSupabaseRest(config, "newsletter_subscribers", {
    method: "GET",
    searchParams: {
      select: "id",
      email: `eq.${email}`,
      limit: "1",
    },
  });

  return Array.isArray(rows) && rows.length > 0;
}

async function insertSubscriber(config, email) {
  await callSupabaseRest(config, "newsletter_subscribers", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email }),
  });
}

async function deleteSubscriber(config, email) {
  await callSupabaseRest(config, "newsletter_subscribers", {
    method: "DELETE",
    headers: {
      Prefer: "return=minimal",
    },
    searchParams: {
      email: `eq.${email}`,
    },
  });
}

async function sendResendEmail(config, payload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const parsedBody = await parseJsonResponse(response);

  if (!response.ok) {
    const errorDetail =
      typeof parsedBody === "object" && parsedBody !== null
        ? JSON.stringify(parsedBody)
        : parsedBody || response.statusText;
    throw new Error(`Resend send failed (${response.status}): ${errorDetail}`);
  }

  return parsedBody;
}

module.exports = {
  createUnsubscribeSignature,
  deleteSubscriber,
  getBaseUrl,
  getSubscribeConfig,
  getSupabaseConfig,
  htmlResponse,
  insertSubscriber,
  isValidEmail,
  isValidUnsubscribeSignature,
  jsonResponse,
  normalizeEmail,
  sendResendEmail,
  subscriberExists,
};
