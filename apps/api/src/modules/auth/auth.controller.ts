import { Controller, Get, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Public, Session } from "@/decorators";
import { ConfigService } from "@/config/config.service";
import { AuthSessionService } from "./services";
import { AuthService } from "./auth.service";
import { RefreshTokenGuard } from "./guards";
import { GoogleOAuthProvider } from "./providers";
import { ServerSession } from "@/types";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly sessionService: AuthSessionService,
        private readonly configService: ConfigService,

        private readonly googleOAuthProvider: GoogleOAuthProvider,
    ) {}

    @Public()
    @Get("/google")
    async getGoogleOAuthUlr() {
        const link = await this.googleOAuthProvider.getAuthorizationLink();
        return { link };
    }

    @Public()
    @Get("/google/redirect")
    async getOAuthUser(

        @Query("code") code: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        if (!code) {
            return response.redirect(this.configService.env("PWA_PUBLIC_URL") + "/login");
        }

        try {
            const session = await this.googleOAuthProvider.authorize(code);

            this.sessionService.setClientSession(response, session);

            return response.redirect(this.configService.env("PWA_PUBLIC_URL"));
        } catch {
            return response.redirect(this.configService.env("PWA_PUBLIC_URL") + "/login");
        }
    }

    @Get("/logout")
    logout(
        @Session() session: ServerSession,
        @Res({ passthrough: true }) response: Response,
    ) {
        this.sessionService.clearClientSession(response);
        return this.authService.logout(session);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post("/refresh")
    async refreshSession(
        @Session() session: ServerSession,
    ) {
        const { payload: _, ...tokens } = await this.authService.refreshSession(session);
        return tokens;
    }
}