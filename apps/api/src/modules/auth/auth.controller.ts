import { BadRequestException, Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { Public } from "@/decorators";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthService } from "./auth.service";
import { ConfigService } from "@/config/config.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtStrategy: JwtStrategy,
        private readonly configService: ConfigService,
    ) {}

    @Public()
    @Get("/google")
    async getGoogleOAuthUlr() {
        const link = await this.authService.getGoogleOAuthLink();
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
            const user = await this.authService.getGoogleOAuthUser(code);
            const { newUser, session } = await this.authService.authWithGoogle(user);

            this.jwtStrategy.setJwtSession(response, session);

            if(newUser) {
                return response.redirect(this.configService.env("PWA_PUBLIC_URL") + "/onboarding/photo");
            } else {
                return response.redirect(this.configService.env("PWA_PUBLIC_URL"));
            }
        } catch {
            return response.redirect(this.configService.env("PWA_PUBLIC_URL") + "/login");
        }
    }

    @Get("/logout")
    async logout(
        @Res({ passthrough: true }) response: Response,
    ) {
        this.jwtStrategy.clearJwtSession(response);
        return true;
    }
}