const {
  createUnsubscribeSignature,
  getBaseUrl,
  getSubscribeConfig,
  insertSubscriber,
  isValidEmail,
  jsonResponse,
  normalizeEmail,
  sendResendEmail,
  subscriberExists,
} = require("./_newsletter");

function buildWelcomeHtml(unsubscribeUrl) {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#0f172a;">You are subscribed</h1>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
                  Thanks for subscribing to Bundleist updates. You will receive product updates, logistics insights, and release notes.
                </p>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#334155;">
                  If this was not you, you can unsubscribe anytime with one click.
                </p>
                <p style="margin:0;">
                  <a href="${unsubscribeUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:10px 16px;border-radius:8px;">
                    Unsubscribe
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildWelcomeText(unsubscribeUrl) {
  return [
    "You are subscribed to Bundleist updates.",
    "",
    "Thanks for subscribing. You will receive product updates, logistics insights, and release notes.",
    "",
    `Unsubscribe any time: ${unsubscribeUrl}`,
  ].join("\n");
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

  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) {
    return jsonResponse(400, { code: "invalid_email" });
  }

  let config;
  try {
    config = getSubscribeConfig();
  } catch (error) {
    console.error("newsletter-subscribe: missing env:", error.message);
    return jsonResponse(500, { code: "server_misconfigured" });
  }

  try {
    const alreadySubscribed = await subscriberExists(config, email);
    if (alreadySubscribed) {
      return jsonResponse(409, { code: "already_subscribed" });
    }

    await insertSubscriber(config, email);

    let emailDelivery = "sent";
    try {
      const signature = createUnsubscribeSignature(email, config.unsubscribeSecret);
      const baseUrl = getBaseUrl(event);
      const unsubscribeUrl = `${baseUrl}/.netlify/functions/newsletter-unsubscribe?email=${encodeURIComponent(email)}&sig=${signature}`;

      await sendResendEmail(config, {
        from: config.newsletterFromEmail,
        to: [email],
        subject: "Bundleist newsletter subscription confirmed",
        html: buildWelcomeHtml(unsubscribeUrl),
        text: buildWelcomeText(unsubscribeUrl),
      });
    } catch (emailError) {
      // Keep subscription even if provider is in testing mode or temporarily fails.
      emailDelivery = "failed";
      console.error("newsletter-subscribe send failed:", emailError);
    }

    return jsonResponse(200, { ok: true, email_delivery: emailDelivery });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("newsletter_subscribers_email_key") ||
        error.message.includes("duplicate key value violates unique constraint"))
    ) {
      return jsonResponse(409, { code: "already_subscribed" });
    }

    console.error("newsletter-subscribe failed:", error);
    return jsonResponse(500, { code: "subscribe_failed" });
  }
};
