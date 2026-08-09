import { sendMail } from "./mail.service";

export default async function handler(request: Request): Promise<Response> {
    if (request.method !== "POST") {
        return Response.json(
            { error: "Method not allowed" },
            { status: 405 }
        );
    }

    try {
        const formData = await request.formData();

        const email = formData.get("email");
        const name = formData.get("nombre");
        const subject = formData.get("asunto");
        const message = formData.get("mensaje");
        const thePit = formData.get("thePit");

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
            typeof name !== "string" ||
            typeof subject !== "string" ||
            typeof message !== "string"
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
            name.length > 50 ||
            email.length > 120 ||
            subject.length > 75 ||
            message.length > 500 || message.length < 25
        ) {
            return Response.json(
                { error: "Message too long" },
                { status: 400 }
            );
        }

        await sendMail({
            email,
            name,
            subject,
            message,
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