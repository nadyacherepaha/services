import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendResetEmail(to: string, link: string) {
    await mailer.sendMail({
        from: process.env.MAIL_FROM ?? 'no-reply@yourapp.com',
        to,
        subject: 'Reset your password',
        html: `
      <p>We received a request to reset your password.</p>
      <p><a href="${link}" style="color:#2563EB">Reset password</a></p>
      <p>This link will expire in 30 minutes. If you didn't request it, just ignore this email.</p>
    `,
    });
}
