import { Injectable } from "@nestjs/common";
import "dotenv/config";

const environmentVariables = [
    // Application
    "PORT",
    "MODE",
    "DOMAIN",

    // CORS
    "API_PUBLIC_URL",
    "PWA_PUBLIC_URL",

    // Database
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",

    // Providers
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
] as const;

@Injectable()
export class ConfigService {

    constructor() {
        this.ensureValues();
    }

    public env(key: typeof environmentVariables[number]): string {
        return process.env[key] as string;
    }

    public isDevelopment() {
        const mode = this.env("MODE");
        return mode === "DEV";
    }

    private ensureValues() {
        environmentVariables.forEach(item => {
            const value = process.env[item];
            if(!value) throw new Error(`Config error: missing env.${item}`);
        });
    }
}