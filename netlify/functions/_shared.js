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

function htmlResponse(statusCode, html) {
  return {
    statusCode,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
    body: html,
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

function readHeader(source, headerName) {
  if (!source || !headerName) {
    return "";
  }

  const headers =
    source && typeof source === "object" && source.headers && typeof source.headers === "object"
      ? source.headers
      : source;

  if (!headers || typeof headers !== "object") {
    return "";
  }

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

async function parseJsonResponse(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function isValidUuid(value) {
  return UUID_PATTERN.test(String(value || ""));
}

module.exports = {
  getRequiredEnv,
  htmlResponse,
  isValidUuid,
  jsonResponse,
  parseBearerToken,
  parseJsonResponse,
  readHeader,
};
