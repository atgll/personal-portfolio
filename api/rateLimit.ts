/**
 * Rate Limiting para Vercel Serverless Functions
 * Solución simple en memoria (funciona bien con cold starts limitados)
 * 
 * Para producción escalable, considera usar Upstash Redis:
 * npm install @upstash/redis
 */

interface RateLimitRecord {
    count: number;
    resetTime: number;
}

// Map en memoria para almacenar intentos por IP
// Se reinicia con cada cold start de la función (comportamiento aceptable)
const requestCounts = new Map<string, RateLimitRecord>();

/**
 * Obtiene la IP real del cliente en Vercel
 * Vercel proporciona la IP en headers específicos
 * 
 * @param headers - Headers de la request
 * @returns IP del cliente o 'unknown'
 */
export function getClientIp(headers: Record<string, string | string[] | undefined>): string {
    // En Vercel, x-forwarded-for contiene la IP real
    const forwardedFor = headers['x-forwarded-for'];
    if (forwardedFor) {
        const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
        return ip.split(',')[0].trim();
    }
    
    // Fallback a cf-connecting-ip (si usa Cloudflare)
    const cfIp = headers['cf-connecting-ip'];
    if (cfIp) {
        return Array.isArray(cfIp) ? cfIp[0] : cfIp;
    }
    
    return 'unknown';
}

/**
 * Verifica si una IP ha excedido el rate limit
 * Límite: 3 solicitudes cada 15 minutos
 * 
 * @param ip - Dirección IP del cliente
 * @returns true si la solicitud es permitida, false si está limitada
 */
export function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const WINDOW_MS = 15 * 60 * 1000; // 15 minutos
    const MAX_REQUESTS = 3;
    
    const record = requestCounts.get(ip);
    
    // Primera solicitud o ventana expirada
    if (!record || now > record.resetTime) {
        requestCounts.set(ip, {
            count: 1,
            resetTime: now + WINDOW_MS,
        });
        return true;
    }
    
    // Solicitud dentro de la ventana
    if (record.count >= MAX_REQUESTS) {
        // Límite excedido
        return false;
    }
    
    // Incrementar contador
    record.count++;
    return true;
}

/**
 * Limpia registros antiguos del Map
 * Llamar ocasionalmente para prevenir memory leaks
 * En Vercel, con cold starts frecuentes, esto es menos crítico
 * 
 * @param maxAge - Edad máxima en ms (default: 1 hora)
 */
export function cleanupOldRecords(maxAge: number = 60 * 60 * 1000): void {
    const now = Date.now();
    const entriesToDelete: string[] = [];
    
    requestCounts.forEach((record, ip) => {
        // Si la ventana de reset ya pasó hace más de maxAge, eliminar
        if (now - record.resetTime > maxAge) {
            entriesToDelete.push(ip);
        }
    });
    
    entriesToDelete.forEach(ip => requestCounts.delete(ip));
}

/**
 * Obtiene estadísticas del rate limiter (para debugging)
 * 
 * @returns Objeto con estadísticas
 */
export function getStats() {
    return {
        totalIPs: requestCounts.size,
        records: Array.from(requestCounts.entries()).map(([ip, record]) => ({
            ip,
            count: record.count,
            resetTime: new Date(record.resetTime),
        })),
    };
}
