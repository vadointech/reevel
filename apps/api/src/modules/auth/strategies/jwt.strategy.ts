import {
    Injectable,
} from "@nestjs/common";
import { CookieOptions, Request, Response } from "express";
import {
    JwtTokens,
    JwtAccessToken,
    JwtRefreshToken,
    JwtAccessTokenPayload,
} from "@/modules/auth/dto/jwt-token.dto";
import { ServerSession } from "@/types";
import { SessionResponseDto } from "@/modules/auth/dto/auth.dto";
import { UserEntity } from "@/modules/user/entities/user.entity";
import authConfig from "@/modules/auth/auth.config";
import { ConfigService } from "@/config/config.service";

@Injectable()
export class JwtStrategy {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    private readonly cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: "localhost",
        path: "/",
    };

    createSession(user: UserEntity): SessionResponseDto {
        const { accessToken, refreshToken } = this.generateTokens({
            sub: user.id,
            email: user.email,
            completed: user.profile.completed,
            subscription: user.subscription.type,
            location: user.profile.location ? {
                id: user.profile.location?.id,
                coordinates: user.profile.location?.center?.coordinates,
            }: undefined,
        });

        return {
            payload: accessToken.payload,
            accessToken: accessToken.signature,
            refreshToken: refreshToken.signature,
        };
    }

    setServerSession(request: Request, payload: JwtAccessTokenPayload) {
        request["user"] = {
            user: {
                id: payload.sub,
                email: payload.email,
                subscription: payload.subscription,
                location: payload.location,
            },
        } satisfies ServerSession;
    }

    setClientSession(response: Response, session: SessionResponseDto) {
        response.cookie(
            authConfig.accessToken.cookieKey,
            session.accessToken,
            this.cookieOptions,
        );
        response.cookie(
            authConfig.refreshToken.cookieKey,
            session.refreshToken,
            this.cookieOptions,
        );
    }

    clearClientSession(response: Response) {
        response.clearCookie(authConfig.accessToken.cookieKey, this.cookieOptions);
        response.clearCookie(authConfig.refreshToken.cookieKey, this.cookieOptions);
    }

    generateTokens(payload: JwtAccessTokenPayload): JwtTokens {
        const accessToken = new JwtAccessToken(payload);
        const refreshToken = new JwtRefreshToken(payload);
        return { accessToken, refreshToken };
    }
}