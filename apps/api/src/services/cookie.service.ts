import { Injectable } from "@nestjs/common";
import { ConfigService } from "@/config/config.service";
import { Response } from "express";

@Injectable()
export class CookieService {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    private readonly cookieParams = {
        httpOnly: false,
        secure: !this.configService.isDevelopment(),
        sameSite: "none" as const,
        domain: this.configService.env("DOMAIN"),
    };

    private readonly httpCookieParams = {
        ...this.cookieParams,
        httpOnly: true,
    };

    setHttpCookie(response: Response, key: string, value: unknown) {
        response.cookie(key, JSON.stringify(value), this.httpCookieParams);
    }
    clearHttpCookie(response: Response, key: string) {
        response.clearCookie(key, this.httpCookieParams);
    }

    setCookie(response: Response, key: string, value: unknown) {
        response.cookie(key, JSON.stringify(value), this.cookieParams);
    }
    clearCookie(response: Response, key: string) {
        response.clearCookie(key, this.cookieParams);
    }
}