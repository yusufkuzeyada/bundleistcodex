const {
  deleteSubscriber,
  getSupabaseConfig,
  htmlResponse,
  isValidEmail,
  isValidUnsubscribeSignature,
  normalizeEmail,
} = require("./_newsletter");

function renderPage({ title, message, status }) {
  const badgeColor = status === "success" ? "#15803d" : "#b91c1c";
  const badgeText = status === "success" ? "Done" : "Error";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:28px;">
                <div style="display:inline-block;margin-bottom:10px;background:${badgeColor};color:#ffffff;font-size:12px;font-weight:700;padding:5px 10px;border-radius:999px;">${badgeText}</div>
                <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#0f172a;">${title}</h1>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">${message}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return htmlResponse(
      405,
      renderPage({
        title: "Method not allowed",
        message: "Use the unsubscribe link from the email.",
        status: "error",
      }),
    );
  }

  const query = event.queryStringParameters || {};
  const email = normalizeEmail(query.email || "");
  const signature = typeof query.sig === "string" ? query.sig : "";

  if (!isValidEmail(email) || !signature) {
    return htmlResponse(
      400,
      renderPage({
        title: "Invalid unsubscribe link",
        message: "The link is incomplete or invalid.",
        status: "error",
      }),
    );
  }

  let config;
  try {
    config = getSupabaseConfig();
  } catch (error) {
    console.error("newsletter-unsubscribe: missing env:", error.message);
    return htmlResponse(
      500,
      renderPage({
        title: "Server misconfigured",
        message: "Please try again later.",
        status: "error",
      }),
    );
  }

  const signatureValid = isValidUnsubscribeSignature(
    email,
    signature,
    config.unsubscribeSecret,
  );

  if (!signatureValid) {
    return htmlResponse(
      400,
      renderPage({
        title: "Invalid unsubscribe link",
        message: "Signature check failed for this unsubscribe URL.",
        status: "error",
      }),
    );
  }

  try {
    await deleteSubscriber(config, email);

    return htmlResponse(
      200,
      renderPage({
        title: "You are unsubscribed",
        message:
          "Your email has been removed from the newsletter list. You will not receive future newsletter emails.",
        status: "success",
      }),
    );
  } catch (error) {
    console.error("newsletter-unsubscribe failed:", error);
    return htmlResponse(
      500,
      renderPage({
        title: "Unsubscribe failed",
        message: "Please try the link again later.",
        status: "error",
      }),
    );
  }
};
