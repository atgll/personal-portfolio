import {VercelRequest, VercelResponse} from '@vercel/node'
import {sendMail} from "./mail.service";

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<Response> {
    if (req.method !== "POST") {
        return Response.json(
            { error: "Method not allowed" },
            { status: 405 }
        );
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
            return Response.json(
                { error: "Invalid request" },
                { status: 400 }
            );
        }

        // Comprobamos que todos los valores sean strings
        if (
            typeof email !== "string" ||
            typeof nombre !== "string" ||
            typeof asunto !== "string" ||
            typeof mensaje !== "string"
        ) {
            return Response.json(
                { error: "Missing or invalid fields" },
                { status: 400 }
            );
        }

        // Validación básica del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return Response.json(
                { error: "Invalid email" },
                { status: 400 }
            );
        }

        // Límites básicos
        if (
            nombre.length > 50 ||
            email.length > 120 ||
            asunto.length > 75 ||
            mensaje.length > 500 || mensaje.length < 25
        ) {
            return Response.json(
                { error: "Message length invalid" },
                { status: 400 }
            );
        }

        await sendMail({
            email,
            nombre,
            asunto,
            mensaje,
        });

        return Response.json(
            { success: true },
            { status: 200 }
        );

    } catch (error) {
        console.error("CONTACT API ERROR:", error);

        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}