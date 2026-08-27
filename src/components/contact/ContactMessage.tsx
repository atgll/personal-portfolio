import './contact-style.css'
import {useEffect, useRef, useState} from "react";

// Declaración de tipos para window.turnstile
declare global {
    interface Window {
        turnstile?: {
            render: (element: HTMLElement, options: {
                sitekey: string;
                callback: (token: string) => void;
            }) => void;
        };
    }
}

export default function ContactMessage() {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string>('');
    const turnstileRef = useRef<HTMLDivElement>(null);
    const turnstileRendered = useRef(false)

    useEffect(() => {

        const renderTurnstile = () => {
            if (window.turnstile && turnstileRef.current && !turnstileRendered.current) {
                window.turnstile.render(turnstileRef.current, {
                    sitekey: import.meta.env.VITE_SITE_KEY,
                    callback: (token: string) => setTurnstileToken(token),
                });

                turnstileRendered.current = true;
            }
        }

        const createScript = () => {
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            script.defer = true;

            script.onload = () => renderTurnstile;
            document.head.appendChild(script);
        }

        const existingScript = document.querySelector(
            'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
        );

        if(window.turnstile) {
            renderTurnstile()
        } else if (!existingScript){
            createScript();
        } else {
            existingScript.addEventListener('load', renderTurnstile)
        }

        return () => {
            existingScript?.removeEventListener('load', renderTurnstile)
        }

        /*// Cargar script de Turnstile una sola vez
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            // Esperar a que el widget esté disponible
            if (window.turnstile && turnstileRef.current && !turnstileRendered.current) {
                window.turnstile.render(turnstileRef.current, {
                    sitekey: import.meta.env.VITE_SITE_KEY,
                    callback: (token: string) => setTurnstileToken(token),
                });

                turnstileRendered.current = true;
            }
        };*/

    }, []);

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {

        try {
            event.preventDefault();

            setError(false);
            setSuccess(false);
            setIsSending(true);

            // Validar que el token de Turnstile esté presente
            if (!turnstileToken) {
                setError(true);
                setIsSending(false);
                return;
            }

            const form = event.currentTarget;
            const formData = new FormData(form);

            const data = {
                ...Object.fromEntries(formData.entries()),
                'cf-turnstile-response': turnstileToken,
            };

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });


            const contentType = response.headers.get("content-type");

            let respuesta: { error?: string };

            if(contentType?.includes("application/json")) {
                respuesta = await response.json();
            } else {
                const text = await response.text();

                respuesta = {
                    error: text || "Error del servidor",
                };
            }


            if (!response.ok) {
                console.error("API ERROR:", respuesta);
                setError(true);
                return;
            }

            form.reset();

            setSuccess(true);


        } catch (e) {
            setError(true);
            console.error('Mail Error:', e);
        } finally {
            setIsSending(false);
        }


    };


    return (
        <div className='inter-text form-container'>
            <div className='d-flex column gap-1'>
                <h3 className='garet-title fs-l'> O escríbeme directamente</h3>
                <p className='inter-text'>Cuéntame brevemente qué tienes en mente y te responderé lo antes posible.</p>
            </div>
            <form className='contact-form' onSubmit={handleSubmit}>
                <label className='contact-form-label'>
                    Email:
                    <input className='contact-form-input' type="email" name="email" id='cf-email'
                           placeholder='¿Donde puedo responderte?' required/>
                </label>
                <label className='contact-form-label'>
                    Nombre:
                    <input className='contact-form-input' type="text" name="nombre" id='cf-nombre'
                           placeholder='¿Cómo te llamas?' required/>
                </label>
                <label className='contact-form-label'>
                    Asunto:
                    <input className='contact-form-input' type="text" name="asunto" id='cf-asunto'
                           placeholder='¿Sobre qué quieres hablar?' required/>
                </label>
                <label className='contact-form-label'>
                    Mensaje:
                    <textarea className='contact-form-textarea inter-text' name="mensaje" id='cf-mensaje'
                              placeholder='Cuéntame un poco más...' required/>
                </label>
                <label className='honeypot' style={{padding: '0'}}>
                    <input tabIndex={-1} autoComplete='off' name="thePit" id='cf-thePit'/>
                </label>
                <div ref={turnstileRef} />
                <div className='d-flex gap-4' style={{paddingLeft: '2em'}}>
                    <button type='submit' className='btn btn-primary '>
                        {isSending ? 'Enviando...' : 'Enviar'}
                    </button>
                    <button type='reset' disabled={isSending} className='btn btn-primary '>
                        Reset
                    </button>
                </div>
                {error ? <p style={{padding:'10px', backgroundColor: 'rgb(235 10 10 / 0.5)', color: '#ff0000'}} className='inter-text fs-l'><strong>Error:</strong> No se pudo enviar el mensaje</p> : ''}
                {success ? <p style={{padding:'10px', backgroundColor: 'rgb(48 175 4 / 0.5)', color: '#49b401'}} className='inter-text fs-l'><strong>Mensaje enviado:</strong> Gracias por contactar</p> : ''}
            </form>
        </div>
    )
}
