/**
 * Validadores para el formulario de contacto
 * Proporciona validaciones seguras y sanitización de datos
 */

/**
 * Valida un email con estándar mejorado
 * Rechaza emails claramente inválidos
 * 
 * @param email - Email a validar
 * @returns true si el email es válido
 */
export function isValidEmail(email: string): boolean {
    // Expresión regular mejorada que requiere TLD válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
        return false;
    }
    
    // Validaciones adicionales según RFC 5321
    if (email.length > 254) {
        return false;
    }
    
    const [localPart, domain] = email.split('@');
    
    // La parte local no puede empezar o terminar con punto
    if (localPart.startsWith('.') || localPart.endsWith('.')) {
        return false;
    }
    
    // El dominio debe tener al menos un punto
    if (!domain.includes('.')) {
        return false;
    }
    
    return true;
}

/**
 * Sanitiza strings para prevenir XSS
 * Elimina caracteres especiales HTML peligrosos
 * 
 * @param text - Texto a sanitizar
 * @returns Texto sanitizado y trimmed
 */
export function sanitizeText(text: string): string {
    return text
        .replace(/[<>]/g, '') // Elimina < y >
        .replace(/&/g, '&amp;') // Escapa &
        .trim();
}

/**
 * Valida la longitud de todos los campos del formulario
 * 
 * @param data - Objeto con los campos a validar
 * @returns true si todas las longitudes son válidas
 */
export function validateFieldLengths(data: {
    nombre: string;
    email: string;
    asunto: string;
    mensaje: string;
}): boolean {
    return (
        data.nombre.length > 0 && data.nombre.length <= 50 &&
        data.email.length > 0 && data.email.length <= 120 &&
        data.asunto.length > 0 && data.asunto.length <= 75 &&
        data.mensaje.length > 0 && data.mensaje.length <= 500
    );
}

/**
 * Verifica que los campos no estén vacíos
 * 
 * @param data - Objeto con los campos a verificar
 * @returns true si algún campo está vacío
 */
export function areFieldsEmpty(data: {
    nombre?: string;
    email?: string;
    asunto?: string;
    mensaje?: string;
}): boolean {
    return !data.nombre || !data.email || !data.asunto || !data.mensaje;
}
