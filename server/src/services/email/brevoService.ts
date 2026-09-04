import { logger } from '../../utils/logger.js';

interface SendOtpOptions {
  toEmail: string;
  recipientName: string;
  otp: string;
  purpose?: 'registration' | 'login' | 'reset';
}

/**
 * Brevo (Sendinblue) Transactional Email Service for JharSankalp
 */
export async function sendBrevoOtpEmail({
  toEmail,
  recipientName,
  otp,
  purpose = 'registration',
}: SendOtpOptions): Promise<{ success: boolean; messageId?: string; fallback?: boolean }> {
  const senderEmail = process.env.EMAIL_USER || 'clinicsync1208@gmail.com';
  const senderName = 'JharSankalp — Govt. of Jharkhand';
  const apiKey = process.env.BREVO_API_KEY;

  const subject = `Your JharSankalp Verification Code: ${otp}`;

  // Custom branded HTML template
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JharSankalp Verification Code</title>
</head>
<body style="margin:0;padding:0;background-color:#F8F6F1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1D2522;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F8F6F1;padding:40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:580px;background:#FFFFFF;border-radius:16px;border:1px solid #EEEAE1;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.04);">
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#123B2A;padding:32px 36px;text-align:left;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size:22px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">
                      JharSankalp
                    </div>
                    <div style="font-size:11px;font-weight:600;color:#F5A623;letter-spacing:1.5px;text-transform:uppercase;margin-top:4px;">
                      Ideas · Collaboration · Impact
                    </div>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;padding:4px 10px;background:rgba(255,255,255,0.12);border-radius:6px;font-size:11px;color:#F8F6F1;font-family:monospace;">
                      SECURE OTP
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:36px 36px 28px;">
              <h1 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#1D2522;line-height:1.3;">
                Verify your official account
              </h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#554B3E;">
                Namaste <strong>${recipientName || 'Innovator'}</strong>,
              </p>
              <p style="margin:0 0 28px;font-size:14.5px;line-height:1.6;color:#554B3E;">
                Thank you for contributing to Jharkhand's civic innovation ecosystem. Use the one-time verification code below to complete your ${purpose}:
              </p>

              <!-- OTP Code Display Card -->
              <div style="text-align:center;background:#FAF9F5;border:2px dashed #123B2A;border-radius:12px;padding:24px 20px;margin:0 0 28px;">
                <span style="display:block;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#6B5845;text-transform:uppercase;margin-bottom:8px;">
                  ONE-TIME PASSCODE
                </span>
                <span style="font-size:36px;font-weight:800;letter-spacing:10px;color:#123B2A;font-family:Consolas,monaco,monospace;">
                  ${otp}
                </span>
                <span style="display:block;font-size:12px;color:#8F7E6B;margin-top:8px;">
                  Valid for the next 10 minutes
                </span>
              </div>

              <!-- Security Warning -->
              <table role="presentation" width="100%" style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:12px 16px;margin-bottom:28px;">
                <tr>
                  <td style="font-size:12.5px;color:#92400E;line-height:1.5;">
                    🔒 <strong>Security Reminder:</strong> Never share this OTP with anyone, including government or university representatives. JharSankalp officers will never ask for your verification code.
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;line-height:1.5;color:#6B5845;">
                If you did not initiate this request, you can safely disregard this email. Your account remains protected.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAF9F5;padding:20px 36px;border-top:1px solid #EEEAE1;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;color:#6B5845;font-weight:600;">
                Govt. of Jharkhand · State Innovation Cell · Smart India Hackathon 2026
              </p>
              <p style="margin:0;font-size:10.5px;color:#9A8B7A;">
                Connecting Grassroots Problems to University & Industry Solutions
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  // Check if API key is provided
  if (!apiKey || apiKey.trim() === '') {
    logger.warn(`[Brevo Email] No BREVO_API_KEY configured. Falling back to local console dispatch.`);
    console.log(`\n======================================================`);
    console.log(`[JharSankalp OTP Dispatch - Dev Fallback]`);
    console.log(`To: ${toEmail} (${recipientName})`);
    console.log(`Subject: ${subject}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`======================================================\n`);
    return { success: true, fallback: true };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey.trim(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: toEmail,
            name: recipientName || toEmail.split('@')[0],
          },
        ],
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error(`[Brevo Email] Failed to send email via Brevo API: ${response.status} ${errText}`);
      // Fall back to console log so user flow is not broken in dev/demo
      console.log(`\n[JharSankalp Brevo API Warning] ${response.status} — OTP for ${toEmail}: ${otp}\n`);
      return { success: true, fallback: true };
    }

    const data = (await response.json()) as { messageId?: string };
    logger.info(`[Brevo Email] Successfully sent OTP email to ${toEmail}`, {
      messageId: data.messageId,
    });
    return { success: true, messageId: data.messageId };
  } catch (error: any) {
    logger.error(`[Brevo Email] Network error sending email: ${error.message}`);
    // Log fallback in dev
    console.log(`\n[JharSankalp Brevo Network Fallback] OTP for ${toEmail}: ${otp}\n`);
    return { success: true, fallback: true };
  }
}
