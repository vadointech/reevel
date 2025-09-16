import { Inject, Injectable } from "@nestjs/common";
import { CookieOptions, Request, Response } from "express";
import { AuthTokensService } from "./tokens.service";
import { SessionResponseDto } from "../dto/auth.dto";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { AUTH_MODULE_CONFIG, AuthModuleConfig } from "../auth.config";
import { JwtAccessTokenPayload, JwtRefreshTokenPayload } from "../types/tokens";
import { ISessionUser, ServerSession } from "@/types";
import { ConfigService } from "@/config/config.service";

@Injectable()
export class AuthSessionService {
    constructor(
        @Inject(AUTH_MODULE_CONFIG)
        private readonly authConfig: AuthModuleConfig,
        private readonly tokenService: AuthTokensService,
        private readonly configService: ConfigService,
    ) {}

    private readonly cookieOptions: CookieOptions = {
        httpOnly: true,
        path: "/",
        secure: this.configService.isProduction,
        sameSite: "none",
        domain: this.configService.env("DOMAIN"),
    };

    async createSession(user: UserEntity): Promise<SessionResponseDto> {
        const accessTokenPayload: JwtAccessTokenPayload = {
            sub: user.id,
            email: user.email,
            completed: user.profile.completed,
            subscription: user.subscription.type,
            locationId:user.profile.location?.id,
            locationCoordinates: user.profile.location?.center.coordinates,
        };

        const refreshTokenPayload: JwtRefreshTokenPayload = {
            sub: user.id,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.tokenService.signAccessToken(accessTokenPayload),
            this.tokenService.signRefreshToken(refreshTokenPayload),
        ]);

        return {
            accessToken,
            refreshToken,
            payload: accessTokenPayload,
        };
    }

    setBaseServerSession(request: Request, token: string, payload: JwtRefreshTokenPayload) {
        request["user"] = {
            user: {
                token,
                id: payload.sub,
            },
        } satisfies ServerSession;
    }

    setServerSession(request: Request, token: string, payload: JwtAccessTokenPayload) {
        request["user"] = {
            user: {
                token,
                id: payload.sub,
                email: payload.email,
                subscription: payload.subscription,
                location: {
                    id: payload.locationId,
                    coordinates: payload.locationCoordinates,
                },
            },
        } satisfies ServerSession<ISessionUser>;
    }

    setClientSession(response: Response, session: SessionResponseDto) {
        response.cookie(
            this.authConfig.accessToken.cookieKey,
            session.accessToken,
            this.cookieOptions,
        );
        response.cookie(
            this.authConfig.refreshToken.cookieKey,
            session.refreshToken,
            this.cookieOptions,
        );
    }

    clearClientSession(response: Response) {
        response.clearCookie(
            this.authConfig.accessToken.cookieKey,
            this.cookieOptions,
        );
        response.clearCookie(
            this.authConfig.refreshToken.cookieKey,
            this.cookieOptions,
        );
    }

    extractTokenFromHeaders(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") || [];
        return type === "Bearer" ? token : undefined;
    }
}