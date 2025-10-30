import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);


export default async function sendVerificationEmail(email, link) {
  try {
    const response = await resend.emails.send({
      from: "Support <no-reply@linksharing.com>", // ✅ clear sender identity
      to: email,
      subject: "Verify your account | Linksharing",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #0d6efd;">Welcome to YourBrand!</h2>
          <p>Hi there,</p>
          <p>Thank you for signing up. Please verify your email address to activate your account.</p>
          <a 
            href="${link}" 
            style="
              display: inline-block;
              margin: 20px 0;
              padding: 10px 20px;
              background-color: #0d6efd;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            "
          >
            Verify My Email
          </a>
          <p>If the button above doesn’t work, copy and paste the following link into your browser:</p>
          <p style="word-break: break-all; color: #555;">${link}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 0.9em; color: #777;">
            If you didn’t create an account with Link-sharing, please ignore this email.
          </p>
        </div>
      `,
    });

    console.log("Verification email sent:", response);
    return response;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
}
