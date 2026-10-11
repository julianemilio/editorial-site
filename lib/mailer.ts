// lib/mailer.ts
// Envío de correos vía SMTP (SpaceMail). Solo server-side.
import nodemailer from "nodemailer";

const port = Number(process.env.SMTP_PORT || 465);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.spacemail.com",
    port,
    secure: port === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

interface SendMailOptions {
    to: string;
    subject: string;
    html: string;
    text: string;
    bcc?: string;
}

export async function sendMail({ to, subject, html, text, bcc }: SendMailOptions) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        throw new Error("Faltan SMTP_USER / SMTP_PASSWORD");
    }

    return transporter.sendMail({
        from: process.env.MAIL_FROM || `Coneja Editorial <${process.env.SMTP_USER}>`,
        to,
        bcc,
        subject,
        html,
        text,
    });
}
