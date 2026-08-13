export interface EnvConfigInterface {
    host: string;
    port: number;
    user: string;
    appPass: string;

    from: string;
    to: string;
    turnstileSecret: string;
}

export function getEnvVariables(key: string, defaultValue?: string): string {
    const value = process.env[key]

    if(!value && !defaultValue) {
        throw new Error(
            `No existen las variables de entorno requeridas: ${key}\n`
        );
    }
    return value || defaultValue!;
}

export function getEnvNumVariables(key: string, defaultValue?: number): number {
    const value = process.env[key]

    if(!value && defaultValue === undefined) {
        throw new Error(
            `No existen las variables de entorno requeridas: ${key}\n`
        );
    }

    const  numValue: number | undefined = value ? parseInt(value, 10) : defaultValue!;

    if(isNaN(numValue)) {
        throw new Error(`${key} should be a number`);
    }

    return numValue;
}

export const env: EnvConfigInterface = {
    host: getEnvVariables('GMAIL_HOST'),
    port: getEnvNumVariables('GMAIL_PORT'),
    user: getEnvVariables('GMAIL_USER'),
    appPass: getEnvVariables('GMAIL_APP_PASSWORD'),
    from: getEnvVariables('MAIL_FROM'),
    to: getEnvVariables('MAIL_TO')
}