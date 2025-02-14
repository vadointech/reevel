import { BadRequestException, Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { Public } from "@/decorators";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    private readonly redirectUrl: string;

    constructor(
        private readonly authService: AuthService,
        private readonly jwtStrategy: JwtStrategy,
    ) {
        // TODO: Replace by valid redirect url (http://localhost:3000/auth/redirect)
        this.redirectUrl = "http://localhost:3001/api";
    }

    @Public()
    @Get("/google")
    getGoogleOAuthUlr() {
        return this.authService.getGoogleOAuthLink();
    }

    @Public()
    @Get("/google/redirect")
    async getOAuthUser(
        @Query("code") code: string,
        @Res({ passthrough: true }) response: Response,
    ) {

        if(!code) throw new BadRequestException("Bad Request");

        const user = await this.authService.getGoogleOAuthUser(code);

        const session = await this.authService.authWithGoogle(user.email);

        this.jwtStrategy.setClientSession(response, session);

        return response.redirect(this.redirectUrl);
    }
}