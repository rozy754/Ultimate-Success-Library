import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendMail(
    to: string,
    resetUrl: string
) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link valid for 15 minutes.</p>`,
        text: `Reset your password: ${resetUrl}`,
    };

    return transporter.sendMail(mailOptions);
}

// new — generic sender for feedbacks / other emails
export async function sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
        html: html || `<pre>${text}</pre>`,
    };

    return transporter.sendMail(mailOptions);
}