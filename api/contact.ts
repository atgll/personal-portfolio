import {VercelRequest, VercelResponse} from '@vercel/node'
import {resMail, sendMail} from "./mail.service";

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {

    if (req.method !== "POST") {
        res.status(405).json(
            { error: "Method not allowed" },
        );
        return
    }

    try {
        const {
            email,
            nombre,
            asunto,
            mensaje,
            thePit,
        } = req.body;

        // Honeypot: si está relleno, probablemente sea un bot
        if (thePit) {
            res.status(400).json(
                { error: "Invalid request" },
            );
            return
        }

        // Comprobamos que todos los valores sean strings
        if (
            typeof email !== "string" ||
            typeof nombre !== "string" ||
            typeof asunto !== "string" ||
            typeof mensaje !== "string"
        ) {
            res.status(400).json(
                { error: "Missing or invalid fields" },
            );
            return
        }

        // Validación básica del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
                res.status(400).json(
                { error: "Invalid email" },
            );
                return
        }

        // Límites básicos
        if (
            nombre.length > 50 ||
            email.length > 120 ||
            asunto.length > 75 ||
            mensaje.length > 500
        ) {
            res.status(400).json(
                { error: "Message length invalid" },
            );
            return
        }

        await sendMail({
            email,
            nombre,
            asunto,
            mensaje,
        });

   /*     await resMail({
            email,
            nombre
        })*/

        res.status(200).json(
            { success: true },
        );

    } catch (error) {
        console.error("CONTACT API ERROR:", error);

        res.status(500).json(
            { error: "Internal server error" }
        );
    }
}