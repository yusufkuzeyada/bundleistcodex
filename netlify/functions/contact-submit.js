const {
  isValidEmail,
  jsonResponse,
  normalizeEmail,
  sendResendEmail,
} = require("./_newsletter");
const { getRequiredEnv } = require("./_shared");

function trimField(value, limit) {
  return String(value || "")
    .trim()
    .slice(0, limit);
}

function buildHtml({ name, email, company, message, source, inboxTarget }) {
  const rows = [
    ["Inbox target", inboxTarget || "sourcevia.inc@gmail.com"],
    ["Name", name],
    ["Email", email],
    ["Company", company || "-"],
    ["Source", source || "contact-form"],
    ["Message", message.replace(/\n/g, "<br>")],
  ];

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 20px;">
                <div style="font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#0f766e;">Sourcevia</div>
                <h1 style="margin:12px 0 0;font-size:24px;line-height:1.2;">New contact inquiry</h1>
                <p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:#475569;">
                  A new message was submitted from the Sourcevia contact form.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  ${rows
                    .map(
                      ([label, value]) => `
                  <tr>
                    <td style="padding:12px 0;border-top:1px solid #e2e8f0;vertical-align:top;width:140px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#64748b;">${label}</td>
                    <td style="padding:12px 0;border-top:1px solid #e2e8f0;font-size:15px;line-height:1.6;color:#0f172a;">${value}</td>
                  </tr>`,
                    )
                    .join("")}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildText({ name, email, company, message, source, inboxTarget }) {
  return [
    "New Sourcevia contact inquiry",
    "",
    `Inbox target: ${inboxTarget || "sourcevia.inc@gmail.com"}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "-"}`,
    `Source: ${source || "contact-form"}`,
    "",
    "Message:",
    message,
  ].join("\n");
}

function getContactConfig() {
  return {
    resendApiKey: getRequiredEnv("RESEND_API_KEY"),
    fromEmail:
      process.env.CONTACT_FROM_EMAIL ||
      process.env.NEWSLETTER_FROM_EMAIL ||
      "Sourcevia <onboarding@resend.dev>",
    toEmail: process.env.CONTACT_TO_EMAIL || "sourcevia.inc@gmail.com",
    fallbackToEmail: process.env.CONTACT_FALLBACK_TO_EMAIL || "",
  };
}

function isResendTestingRecipientError(error) {
  return /only send testing emails to your own email address/i.test(
    String(error && error.message ? error.message : error || ""),
  );
}

async function sendContactEmail(config, payload) {
  const basePayload = {
    from: config.fromEmail,
    to: [config.toEmail],
    reply_to: payload.email,
    subject: `New Sourcevia inquiry from ${payload.name}`,
    html: buildHtml({ ...payload, inboxTarget: config.toEmail }),
    text: buildText({ ...payload, inboxTarget: config.toEmail }),
  };

  try {
    await sendResendEmail(config, basePayload);
    return { deliveredTo: config.toEmail, usedFallback: false };
  } catch (error) {
    // Resend test mode only allows delivery to the account owner's email until a domain is verified.
    if (
      !config.fallbackToEmail ||
      config.fallbackToEmail === config.toEmail ||
      !isResendTestingRecipientError(error)
    ) {
      throw error;
    }

    await sendResendEmail(config, {
      ...basePayload,
      to: [config.fallbackToEmail],
      subject: `[Fallback for ${config.toEmail}] New Sourcevia inquiry from ${payload.name}`,
    });

    return { deliveredTo: config.fallbackToEmail, usedFallback: true };
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

  const name = trimField(body.name, 120);
  const email = normalizeEmail(body.email);
  const company = trimField(body.company, 160);
  const message = trimField(body.message, 4000);
  const source = trimField(body.source, 80);

  if (!name || !isValidEmail(email) || !message) {
    return jsonResponse(400, { code: "invalid_payload" });
  }

  let config;
  try {
    config = getContactConfig();
  } catch (error) {
    console.error("contact-submit: missing env:", error.message);
    return jsonResponse(500, { code: "server_misconfigured" });
  }

  try {
    const result = await sendContactEmail(config, {
      name,
      email,
      company,
      message,
      source,
    });

    return jsonResponse(200, { ok: true, ...result });
  } catch (error) {
    console.error("contact-submit failed:", error);
    return jsonResponse(500, { code: "contact_submit_failed" });
  }
};
