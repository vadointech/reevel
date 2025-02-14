import { Controller, Get, Query, Res } from "@nestjs/common";
import { GoogleOAuthService } from "@/modules/google/services/oauth.service";
import { InjectGoogleOAuthService } from "@/decorators";
import { Response } from "express";
import { CookieService } from "@/services/cookie.service";

@Controller("auth")
export class AuthController {
    private readonly redirectUrl: string;

    constructor(
        @InjectGoogleOAuthService("/auth/google/redirect")
        private readonly googleOAuthService: GoogleOAuthService,
        private readonly cookiesService: CookieService,
    ) {
        // TODO: Replace by valid redirect url (http://localhost:3000/auth/redirect)
        this.redirectUrl = "http://localhost:3001/api";
    }

    @Get("/google")
    getGoogleOAuthUlr() {
        return this.googleOAuthService.generateAuthUrl();
    }

    @Get("/google/redirect")
    async getOAuthUser(
        @Query("code") code: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        if(!code) {
            return response.redirect(this.redirectUrl);
        }

        const credentials = await this.googleOAuthService.getOAuthTokens(code);

        if(!credentials.access_token || !credentials.refresh_token) {
            return response.redirect(this.redirectUrl);
        }

        const userInfo = await this.googleOAuthService.getUserInfo(credentials.access_token);

        if(!userInfo?.email) {
            return response.redirect(this.redirectUrl);
        }

        this.cookiesService.setCookie(response, "test", {
            email: userInfo.email,
            name: userInfo.name,
        });

        return response.redirect(this.redirectUrl);
    }
}
