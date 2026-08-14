import {VercelRequest, VercelResponse} from '@vercel/node'
import {resMail, sendMail} from "./mail.service.js";
import {env} from "./env.config.js";
import { checkRateLimit, getClientIp } from "./rateLimit.js";
import { isValidEmail, validateFieldLengths } from "./validators.js";

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

    // Obtener IP del cliente para rate limiting
    const clientIp = getClientIp(req.headers as Record<string, string | string[] | undefined>);
    console.log('CLIENT IP OBTAINED');

    // Verificar rate limit
    if (!checkRateLimit(clientIp)) {
        console.log(`RATE LIMIT EXCEEDED for IP: ${clientIp}`);
        res.status(429).json(
            { error: "Demasiados intentos. Por favor, intenta más tarde." },
        );
        return;
    }

    console.log('RATE LIMIT OK');

    try {
        console.log('ENTERING TRY');

        const {
            email,
            nombre,
            asunto,
            mensaje,
            thePit,
            'cf-turnstile-response': turnstileToken,
        } = req.body;

        console.log('BODY RECEIVED');

        // Honeypot: si está relleno, probablemente sea un bot
        if (thePit) {
            console.log('HONEYPOT TRIGGERED');
            res.status(400).json(
                { error: "Invalid request" },
            );
            return
        }

        console.log('HONEYPOT OK');

        // Validación de Turnstile
        if (typeof turnstileToken !== 'string' || turnstileToken.length === 0) {
            console.log('TURNSTILE TOKEN MISSING');
            res.status(400).json(
                { error: "Turnstile token missing" },
            );
            return;
        }

        console.log('TURNSTILE TOKEN PRESENT');

        // Llamada a Siteverify
        let turnstileResult;
        try {
            const formData = new URLSearchParams();
            formData.append('secret', env.turnstileSecret);
            formData.append('response', turnstileToken);

            const siteverifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (!siteverifyResponse.ok) {
                throw new Error(`Siteverify HTTP ${siteverifyResponse.status}`);
            }

            turnstileResult = await siteverifyResponse.json();
        } catch (e) {
            console.error('SITEVERIFY ERROR:', e);
            res.status(500).json(
                { error: "Turnstile validation failed" },
            );
            return;
        }

        if (!turnstileResult.success) {
            console.log('TURNSTILE FAILED');
            res.status(400).json(
                { error: "Turnstile validation failed" },
            );
            return;
        }

        console.log('TURNSTILE OK');

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

        // Validación mejorada del email
        if (!isValidEmail(email)) {
            console.log('INVALID EMAIL FORMAT')
            res.status(400).json(
                { error: "Invalid email format" },
            );
            return
        }

        console.log('EMAIL OK')

        // Validar longitudes de campos
        if (!validateFieldLengths({ nombre, email, asunto, mensaje })) {
            console.log('INVALID FIELD LENGTHS')
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
