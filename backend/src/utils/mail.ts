import nodemailer from 'nodemailer';
import { env } from '../env';

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM = 'No-Reply <no-reply@local.test>',
    NODE_ENV = 'development',
} = env;

let transporterPromise: Promise<nodemailer.Transporter> | null = null;

async function createTransport() {
    if (SMTP_HOST) {
        const port = Number(SMTP_PORT ?? 587);
        const secure = String(SMTP_SECURE ?? 'false') === 'true';
        const auth = SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined;

        return nodemailer.createTransport({ host: SMTP_HOST, port, secure, auth });
    }

    if (NODE_ENV !== 'production') {
        const test = await nodemailer.createTestAccount();
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: { user: test.user, pass: test.pass },
        });
    }

    throw new Error('SMTP is not configured (set SMTP_HOST/PORT and credentials)');
}

async function getTransporter() {
    if (!transporterPromise) transporterPromise = createTransport();
    return transporterPromise;
}

export async function sendMail(opts: {
    to: string;
    subject: string;
    html: string;
    text?: string;
    from?: string;
}) {
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
        from: opts.from ?? MAIL_FROM,
        to: opts.to,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
    });

    const preview = nodemailer.getTestMessageUrl?.(info);

    if (preview && NODE_ENV !== 'production') {
        console.log('📧 Email preview:', preview);
    }
    return info;
}

export async function sendResetEmail(to: string, link: string) {
    const subject = 'Reset your password';
    const html = `
        <p>We received a request to reset your password.</p>
        <p><a href="${link}">Click here to reset</a></p>
        <p>If you did not request this, you can ignore this email.</p>
    `;
    const text = `Open this link to reset your password: ${link}`;

    return sendMail({ to, subject, html, text });
}
