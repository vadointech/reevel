import authConfig from "@/modules/auth/auth.config";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "@/modules/user/user.service";
import { CookieService } from "@/services/cookie.service";
import { UserEntity } from "@/modules/user/entities/user.entity";
import {
    AccessJwtTokenPayload,
    RefreshJwtTokenPayload,
    JwtSession,
} from "../dto/jwt.dto";

@Injectable()
export class JwtStrategy {
    constructor(
        private readonly jwtService: JwtService,
        private readonly cookieService: CookieService,
        private readonly userService: UserService,
    ) {}

    async generateSession(user: UserEntity): Promise<JwtSession> {
        const payload: AccessJwtTokenPayload = {
            sub: user.id,
            email: user.email,
            completed: user.profile.completed,
        };

        const [access_token, refresh_token] = await Promise.all([
            this.generateAccessToken(payload),
            this.generateRefreshToken({
                sub: payload.sub,
                email: payload.email,
            }),
        ]);

        return {
            tokens: { access_token, refresh_token },
            payload,
        };
    }

    setServerSession(request: Request, payload: AccessJwtTokenPayload) {
        request["user"] = {
            user: {
                id: payload.sub,
                email: payload.email,
            },
        };
    }

    setJwtSession(response: Response, { tokens }: JwtSession) {
        this.cookieService.setHttpCookie(response, authConfig.accessToken.cookieKey, tokens.access_token);
        this.cookieService.setHttpCookie(response, authConfig.refreshToken.cookieKey, tokens.refresh_token);
    }

    clearJwtSession(response: Response) {
        this.cookieService.clearHttpCookie(response, authConfig.accessToken.cookieKey);
        this.cookieService.clearHttpCookie(response, authConfig.refreshToken.cookieKey);
    }

    async refreshSession(request: Request, response: Response, payload: RefreshJwtTokenPayload) {
        const dbUser = await this.userService.getUserById(payload.sub);

        if(!dbUser) {
            throw new BadRequestException("Refresh session: User does not exists");
        }

        const session=  await this.generateSession(dbUser);
        this.setJwtSession(response, session);
        this.setServerSession(request, session.payload);
    }

    async validateAccessToken(token: string): Promise<{
        valid: boolean;
        payload?: AccessJwtTokenPayload;
    }> {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: authConfig.accessToken.secret,
                maxAge: authConfig.accessToken.expiresIn,
            });
            return { valid: true, payload };
        } catch {
            return { valid: false, payload: undefined };
        }
    }

    async validateRefreshToken(token: string): Promise<{
        valid: boolean;
        payload?: AccessJwtTokenPayload;
    }> {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: authConfig.refreshToken.secret,
                maxAge: authConfig.refreshToken.expiresIn,
            });
            return { valid: true, payload };
        } catch {
            return { valid: false, payload: undefined };
        }
    }

    private async generateAccessToken(payload: AccessJwtTokenPayload) {
        return this.jwtService.sign(payload, {
            secret: authConfig.accessToken.secret,
            expiresIn: authConfig.accessToken.expiresIn,
        });
    }
    private async generateRefreshToken(payload: RefreshJwtTokenPayload) {
        return this.jwtService.sign(payload, {
            secret: authConfig.refreshToken.secret,
            expiresIn: authConfig.refreshToken.expiresIn,
        });
    }
}