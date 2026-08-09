import nodemailer from 'nodemailer'
import {env} from "./env.config";

interface ContactMessageI {
    email: string;
    name: string;
    message: string;
    subject: string;
}

const transporter = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    secure: true,
    auth: {
        user: env.user,
        pass: env.appPass,
    },
});

export const sendMail = async ({email, message, subject, name}: ContactMessageI): Promise<void> => {
    try {
        const mailOptions = {
            from: env.from,
            to: env.to,
            replyTo: email,
            subject: `Portfolio ${subject}`,
            text: `Nombre: ${name}\n Email: ${email} \n Mensaje: ${message}`,
        }

        await transporter.sendMail(mailOptions);

    } catch (e) {
        console.error('MAIL ERROR: ', e)
        throw e;
    }
}
