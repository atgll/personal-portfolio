import {VercelRequest, VercelResponse} from '@vercel/node'
import {resMail, sendMail} from "./mail.service.js";

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {

    console.log('========== CONTACT START ==========');
    console.log('METHOD:', req.method);

    if (req.method !== "POST") {
        console.log('BAD METHOD');
        res.status(405).json(
            { error: "Method not allowed" },
        );
        return
    }

    console.log('METHOD OK');

    try {
        console.log('ENTERING TRY');

        const {
            email,
            nombre,
            asunto,
            mensaje,
            thePit,
        } = req.body;

        console.log('BODY RECEIVED');
        console.log({
            email,
            nombre,
            asunto,
            mensaje,
            thePit,
        });

        // Honeypot: si está relleno, probablemente sea un bot
        if (thePit) {
            console.log('HONEYPOT TRIGGERED');
            res.status(400).json(
                { error: "Invalid request" },
            );
            return
        }

        console.log('HONEYPOT OK');

        // Comprobamos que todos los valores sean strings
        if (
            typeof email !== "string" ||
            typeof nombre !== "string" ||
            typeof asunto !== "string" ||
            typeof mensaje !== "string"
        ) {
            console.log('INVALID TYPES')
            res.status(400).json(
                { error: "Missing or invalid fields" },
            );
            return
        }

        console.log('TYPES OK')

        // Validación básica del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            console.log('BAD EMAIL')
                res.status(400).json(
                { error: "Invalid email" },
            );
                return
        }

        console.log('EMAIL OK')

        // Límites básicos
        if (
            nombre.length > 50 ||
            email.length > 120 ||
            asunto.length > 75 ||
            mensaje.length > 500
        ) {
            console.log('INVALID LENGTHS')
            res.status(400).json(
                { error: "Message length invalid" },
            );
            return
        }

        console.log('VALIDATION OK');
        console.log('ABOUT TO CALL SENDMAIL');

        await sendMail({
            email,
            nombre,
            asunto,
            mensaje,
        });

        console.log('SENDMAIL FINISHED');

        await resMail({
            email,
            nombre
        })

        console.log('RESMAIL FINISHED');

        res.status(200).json(
            { success: true },
        );


        console.log('========== CONTACT END ==========');

    } catch (error) {
        console.error('========== CONTACT ERROR ==========');
        console.error("CONTACT API ERROR:", error);

        res.status(500).json(
            { error: "Internal server error" }
        );
    }
}