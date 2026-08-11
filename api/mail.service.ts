import nodemailer from 'nodemailer';
import {env} from "./env.config";

interface ContactMessageI {
    email: string;
    nombre: string;
    mensaje: string;
    asunto: string;
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

export const sendMail = async ({email, mensaje, asunto, nombre}: ContactMessageI): Promise<void> => {
    try {
        const mailOptions = {
            from: env.from,
            to: env.to,
            replyTo: email,
            subject: `Portfolio ${asunto}`,
            text: `Nombre: ${nombre}\n Email: ${email} \n Mensaje: ${mensaje}`,
        }

        await transporter.sendMail(mailOptions);

    } catch (e) {
        console.error('MAIL ERROR: ', e)
        throw e;
    }
}

export const resMail = async ({email, nombre}: Omit<ContactMessageI, 'mensaje' | 'asunto'>): Promise<void> => {
    try {
        const mailOptions = {
            from: env.from,
            to: email,
            subject: 'Mensaje recibido',
            text: `Gracias por contactarme\nHola ${nombre},\nResponderé a tu mensaje lo más proto posible`,
            html: `<h2 class="garet-splash">ATG</h2><br><br><p class="inter-text">Hola ${nombre}</p><br><p>Gracias por contactarme, responderé a tu mensaje lo más pronto posible</p><br><p><strong class="garet-normal">Angel Torres</strong></p>`
        }

        await transporter.sendMail(mailOptions);

    } catch (e) {
        console.error('MAIL ERROR: ', e)
        throw e;
    }
}
