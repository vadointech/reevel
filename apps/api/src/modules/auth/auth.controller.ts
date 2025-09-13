import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { Public, Session } from "@/decorators";
import { AuthService } from "./auth.service";
import { ConfigService } from "@/config/config.service";
import { RefreshSessionDto } from "@/modules/auth/dto/auth.dto";
import { ServerSession } from "@/types";
import { GoogleOAuthProvider } from "@/modules/auth/providers/google-auth.provider";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtStrategy: JwtStrategy,
        private readonly googleOAuthProvider: GoogleOAuthProvider,
        private readonly configService: ConfigService,
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
        if(!code) {
            return response.redirect(this.configService.env("PWA_PUBLIC_URL") + "/login");
        }

        try {
            const session = await this.googleOAuthProvider.authorize(code);

            this.jwtStrategy.setClientSession(response, session);

            if(session.payload.completed === "true") {
                return response.redirect(this.configService.env("PWA_PUBLIC_URL"));
            } else {
                return response.redirect(this.configService.env("PWA_PUBLIC_URL"));
            }
        } catch {
            return response.redirect(this.configService.env("PWA_PUBLIC_URL") + "/login");
        }
    }

    @Get("/logout")
    logout(
        @Session() session: ServerSession,
        @Res({ passthrough: true }) response: Response,
    ) {
        this.jwtStrategy.clearClientSession(response);
        return this.authService.logout(session);
    }

    @Post("/refresh")
    refreshSession(
        @Session() session: ServerSession,
        @Body() body: RefreshSessionDto,
    ) {
        return this.authService.refreshSession(session, body);
    }
}