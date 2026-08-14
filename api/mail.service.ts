import nodemailer from 'nodemailer';
import {env} from "./env.config.js";
import { sanitizeText } from "./validators.js";

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
        // Sanitizar datos del usuario
        const sanitizedNombre = sanitizeText(nombre);
        const sanitizedAsunto = sanitizeText(asunto);
        const sanitizedMensaje = sanitizeText(mensaje);

        const mailOptions = {
            from: env.from,
            to: env.to,
            replyTo: email,
            subject: `Portfolio ${sanitizedAsunto}`,
            text: `Nombre: ${sanitizedNombre}\nEmail: ${email}\nMensaje: ${sanitizedMensaje}`,
        }

        await transporter.sendMail(mailOptions);

    } catch (e) {
        console.error('MAIL ERROR: ', e)
        throw e;
    }
}

export const resMail = async ({email, nombre}: Omit<ContactMessageI, 'mensaje' | 'asunto'>): Promise<void> => {
    try {
        // Sanitizar nombre para evitar XSS
        const sanitizedNombre = sanitizeText(nombre);

        const mailOptions = {
            from: env.from,
            to: email,
            subject: 'Mensaje recibido',
            text: `Gracias por contactarme\nHola ${sanitizedNombre},\nResponderé a tu mensaje lo más pronto posible`,
            html: `<h2 class="garet-splash logo">ATG</h2><br><br><p class="inter-text">Hola ${sanitizedNombre}</p><br><p>Gracias por contactarme, responderé a tu mensaje lo más pronto posible</p><br><p><strong class="garet-normal">Angel Torres</strong></p>`
        }

        await transporter.sendMail(mailOptions);

    } catch (e) {
        console.error('MAIL ERROR: ', e)
        throw e;
    }
}
