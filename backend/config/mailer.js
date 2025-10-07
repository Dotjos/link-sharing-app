import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendVerificationEmail(email, link) {
    await resend.emails.send({
      from: "no-reply@yourdomain.com",
      to: email,
      subject: "Verify your account",
      html: `<p>Click <a href="${link}">here</a> to verify your account.</p>`,
    });
  }
  