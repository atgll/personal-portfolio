/**
 * Test Security - Pruebas para validadores y rate limiting
 * 
 * Este archivo contiene funciones de prueba para verificar que:
 * 1. La validación de emails funciona correctamente
 * 2. La sanitización previene XSS
 * 3. El rate limiting bloquea después de 3 intentos
 * 4. Los campos se validan por longitud
 * 
 * Uso: Ejecuta estas pruebas manualmente o como unit tests
 */

import { 
    isValidEmail, 
    sanitizeText, 
    validateFieldLengths, 
    areFieldsEmpty 
} from './validators.js';
import { checkRateLimit, getStats } from './rateLimit.js';

// ============================================
// PRUEBAS DE VALIDACIÓN DE EMAIL
// ============================================

export function testEmailValidation(): void {
    console.log('\n📧 ===== PRUEBAS DE EMAIL VALIDATION =====');
    
    const testCases = [
        // Emails válidos
        { email: 'test@example.com', expected: true, desc: 'Email válido simple' },
        { email: 'user.name@domain.co.uk', expected: true, desc: 'Email con punto en local part' },
        { email: 'name+tag@example.com', expected: true, desc: 'Email con + en local part' },
        
        // Emails inválidos
        { email: 'invalidemail', expected: false, desc: 'Sin @' },
        { email: 'test@', expected: false, desc: 'Sin dominio' },
        { email: '@example.com', expected: false, desc: 'Sin local part' },
        { email: 'test@localhost', expected: false, desc: 'Sin TLD' },
        { email: 'test@localhost.x', expected: false, desc: 'TLD muy corto (1 letra)' },
        { email: '.test@example.com', expected: false, desc: 'Local part empieza con punto' },
        { email: 'test.@example.com', expected: false, desc: 'Local part termina con punto' },
        { email: 'test@domain', expected: false, desc: 'Dominio sin punto' },
        { email: 'a@b.c', expected: true, desc: 'Email mínimo válido' },
        { email: 'test@example.c' + 'om'.repeat(126), expected: false, desc: 'Email muy largo (>254 chars)' },
    ];
    
    let passed = 0;
    let failed = 0;
    
    testCases.forEach(({ email, expected, desc }) => {
        const result = isValidEmail(email);
        const status = result === expected ? '✅' : '❌';
        
        if (result === expected) {
            passed++;
        } else {
            failed++;
        }
        
        console.log(`${status} ${desc}`);
        console.log(`   Email: "${email}" → ${result} (esperado: ${expected})`);
    });
    
    console.log(`\n📊 Resultados: ${passed}/${testCases.length} pasadas`);
    if (failed > 0) console.log(`⚠️  ${failed} pruebas fallaron`);
}

// ============================================
// PRUEBAS DE SANITIZACIÓN
// ============================================

export function testSanitization(): void {
    console.log('\n🛡️  ===== PRUEBAS DE SANITIZACIÓN =====');
    
    const testCases = [
        {
            input: '<script>alert("xss")</script>',
            expected: 'scriptalert("xss")/script',
            desc: 'Script tag malicioso',
        },
        {
            input: '<img src=x onerror="alert(1)">',
            expected: 'img src=x onerror="alert(1)"',
            desc: 'Img tag con onerror',
        },
        {
            input: 'Hello & goodbye',
            expected: 'Hello &amp; goodbye',
            desc: 'Ampersand sin escapar',
        },
        {
            input: '  Nombre con espacios  ',
            expected: 'Nombre con espacios',
            desc: 'Espacios al inicio y final (trim)',
        },
        {
            input: 'Texto normal',
            expected: 'Texto normal',
            desc: 'Texto seguro sin cambios',
        },
        {
            input: '<h1>Hola</h1>',
            expected: 'h1Holaih1',
            desc: 'HTML tags',
        },
    ];
    
    let passed = 0;
    let failed = 0;
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = sanitizeText(input);
        const isCorrect = result === expected;
        const status = isCorrect ? '✅' : '❌';
        
        if (isCorrect) {
            passed++;
        } else {
            failed++;
        }
        
        console.log(`${status} ${desc}`);
        console.log(`   Input:    "${input}"`);
        console.log(`   Output:   "${result}"`);
        console.log(`   Esperado: "${expected}"`);
    });
    
    console.log(`\n📊 Resultados: ${passed}/${testCases.length} pasadas`);
    if (failed > 0) console.log(`⚠️  ${failed} pruebas fallaron`);
}

// ============================================
// PRUEBAS DE LONGITUD DE CAMPOS
// ============================================

export function testFieldLengths(): void {
    console.log('\n📏 ===== PRUEBAS DE VALIDACIÓN DE LONGITUDES =====');
    
    const testCases = [
        {
            data: { nombre: 'Juan', email: 'juan@example.com', asunto: 'Consulta', mensaje: 'Hola' },
            expected: true,
            desc: 'Todos los campos válidos',
        },
        {
            data: { nombre: 'a'.repeat(51), email: 'test@example.com', asunto: 'Test', mensaje: 'Msg' },
            expected: false,
            desc: 'Nombre demasiado largo (>50)',
        },
        {
            data: { nombre: 'Juan', email: 'a'.repeat(121) + '@example.com', asunto: 'Test', mensaje: 'Msg' },
            expected: false,
            desc: 'Email demasiado largo (>120)',
        },
        {
            data: { nombre: 'Juan', email: 'test@example.com', asunto: 'a'.repeat(76), mensaje: 'Msg' },
            expected: false,
            desc: 'Asunto demasiado largo (>75)',
        },
        {
            data: { nombre: 'Juan', email: 'test@example.com', asunto: 'Test', mensaje: 'a'.repeat(501) },
            expected: false,
            desc: 'Mensaje demasiado largo (>500)',
        },
        {
            data: { nombre: '', email: 'test@example.com', asunto: 'Test', mensaje: 'Msg' },
            expected: false,
            desc: 'Nombre vacío',
        },
        {
            data: { nombre: 'Juan', email: 'test@example.com', asunto: '', mensaje: 'Msg' },
            expected: false,
            desc: 'Asunto vacío',
        },
    ];
    
    let passed = 0;
    let failed = 0;
    
    testCases.forEach(({ data, expected, desc }) => {
        const result = validateFieldLengths(data);
        const status = result === expected ? '✅' : '❌';
        
        if (result === expected) {
            passed++;
        } else {
            failed++;
        }
        
        console.log(`${status} ${desc}`);
        console.log(`   Resultado: ${result} (esperado: ${expected})`);
    });
    
    console.log(`\n📊 Resultados: ${passed}/${testCases.length} pasadas`);
    if (failed > 0) console.log(`⚠️  ${failed} pruebas fallaron`);
}

// ============================================
// PRUEBAS DE RATE LIMITING
// ============================================

export function testRateLimiting(): void {
    console.log('\n⏱️  ===== PRUEBAS DE RATE LIMITING =====');
    console.log('Límite: 3 solicitudes cada 15 minutos por IP\n');
    
    const testIp = '192.168.1.100';
    let passed = 0;
    let failed = 0;
    
    // Limpiar estados previos (reset del Map)
    // En una prueba real, necesitarías una función para resetear el estado
    
    // Primer intento
    let result = checkRateLimit(testIp);
    let status = result === true ? '✅' : '❌';
    if (result === true) passed++; else failed++;
    console.log(`${status} Intento 1: ${result} (esperado: true)`);
    
    // Segundo intento
    result = checkRateLimit(testIp);
    status = result === true ? '✅' : '❌';
    if (result === true) passed++; else failed++;
    console.log(`${status} Intento 2: ${result} (esperado: true)`);
    
    // Tercer intento
    result = checkRateLimit(testIp);
    status = result === true ? '✅' : '❌';
    if (result === true) passed++; else failed++;
    console.log(`${status} Intento 3: ${result} (esperado: true)`);
    
    // Cuarto intento - debe bloquearse
    result = checkRateLimit(testIp);
    status = result === false ? '✅' : '❌';
    if (result === false) passed++; else failed++;
    console.log(`${status} Intento 4 (BLOQUEADO): ${result} (esperado: false)`);
    
    // Mostrar estadísticas
    console.log('\n📊 Estadísticas del Rate Limiter:');
    const stats = getStats();
    console.log(`   Total IPs registradas: ${stats.totalIPs}`);
    console.log(`   Registros:`, stats.records);
    
    console.log(`\n📊 Resultados: ${passed}/4 pasadas`);
    if (failed > 0) console.log(`⚠️  ${failed} pruebas fallaron`);
}

// ============================================
// EJECUTAR TODAS LAS PRUEBAS
// ============================================

export function runAllTests(): void {
    console.log('\n');
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║   🔐 SUITE DE PRUEBAS DE SEGURIDAD - INICIO   ║');
    console.log('╚════════════════════════════════════════════════╝');
    
    try {
        testEmailValidation();
        testSanitization();
        testFieldLengths();
        testRateLimiting();
        
        console.log('\n');
        console.log('╔════════════════════════════════════════════════╗');
        console.log('║   ✅ SUITE DE PRUEBAS COMPLETADA              ║');
        console.log('╚════════════════════════════════════════════════╝');
        console.log('\n');
    } catch (error) {
        console.error('\n❌ ERROR durante la ejecución de pruebas:', error);
    }
}

// Exportar función para ser llamada desde línea de comandos
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllTests();
}
