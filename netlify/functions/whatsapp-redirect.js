const { getRequiredEnv, readHeader } = require("./_shared");

const DEFAULT_PREFILL_TEXT =
  "Hello, I'd like to inquire about your shipping consolidation services.";

function normalizePhoneNumber(rawValue) {
  return String(rawValue || "").replace(/\D/g, "");
}

function normalizeLanguage(rawValue) {
  const normalized = String(rawValue || "").trim().toLowerCase();
  if (normalized.startsWith("tr")) return "tr";
  if (normalized.startsWith("fr")) return "fr";
  return "en";
}

function resolveLanguage(event) {
  const query =
    event && event.queryStringParameters && typeof event.queryStringParameters === "object"
      ? event.queryStringParameters
      : {};
  const queryLang = query.lang || query.lng || "";
  if (queryLang) {
    return normalizeLanguage(queryLang);
  }

  const acceptLanguage = readHeader(event, "accept-language");
  const firstToken = String(acceptLanguage || "").split(",")[0] || "";
  return normalizeLanguage(firstToken);
}

function resolvePrefillText(language) {
  const byLanguage = {
    tr: process.env.WHATSAPP_PREFILL_TEXT_TR || "",
    en: process.env.WHATSAPP_PREFILL_TEXT_EN || "",
    fr: process.env.WHATSAPP_PREFILL_TEXT_FR || "",
  };
  const fallback = process.env.WHATSAPP_PREFILL_TEXT || DEFAULT_PREFILL_TEXT;
  return byLanguage[language] || byLanguage.en || fallback;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "GET" && event.httpMethod !== "HEAD") {
    return {
      statusCode: 405,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
      body: JSON.stringify({ code: "method_not_allowed" }),
    };
  }

  let configuredPhoneNumber = "";
  try {
    configuredPhoneNumber = getRequiredEnv("WHATSAPP_PHONE_NUMBER");
  } catch (error) {
    console.error("whatsapp-redirect: missing env:", error.message);
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
      body: JSON.stringify({ code: "server_misconfigured" }),
    };
  }

  const normalizedPhoneNumber = normalizePhoneNumber(configuredPhoneNumber);
  if (!normalizedPhoneNumber) {
    console.error("whatsapp-redirect: invalid WHATSAPP_PHONE_NUMBER");
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
      body: JSON.stringify({ code: "server_misconfigured" }),
    };
  }

  const language = resolveLanguage(event);
  const prefillText = resolvePrefillText(language);
  const location = `https://wa.me/${normalizedPhoneNumber}?text=${encodeURIComponent(prefillText)}`;

  return {
    statusCode: 302,
    headers: {
      location,
      "cache-control": "no-store",
    },
    body: "",
  };
};
