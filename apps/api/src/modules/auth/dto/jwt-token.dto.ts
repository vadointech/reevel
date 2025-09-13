import { SubscriptionType } from "@/modules/subscription/entities/subscription.entity";
import * as jwt from "jsonwebtoken";
import authConfig from "@/modules/auth/auth.config";

export interface JwtToken<P extends object> {
    payload: P;
    signature: string;
}

export interface JwtTokens {
    accessToken: JwtAccessToken<JwtAccessTokenPayload>;
    refreshToken: JwtRefreshToken<JwtAccessTokenPayload>;
}

export interface JwtRefreshTokenPayload {
    sub: string;
}

export interface JwtAccessTokenPayload extends JwtRefreshTokenPayload {
    email: string;
    completed: string;
    subscription: SubscriptionType;
    location?: {
        id: string;
        coordinates: number[]
    }
}

export class JwtAccessToken<P extends JwtAccessTokenPayload> implements JwtToken<P> {
    readonly signature: string;

    constructor(readonly payload: P) {
        const jwtPayload: JwtAccessTokenPayload = {
            sub: payload.sub,
            email: payload.email,
            completed: payload.completed,
            subscription: payload.subscription,
            location: payload.location,
        };
        this.signature = jwt.sign(
            jwtPayload,
            authConfig.accessToken.secret, {
                expiresIn: authConfig.accessToken.expiresIn,
            },
        );
    }

    static Verify(signature: string) {
        return jwt.verify(signature, authConfig.accessToken.secret);
    }
}

export class JwtRefreshToken<P extends JwtRefreshTokenPayload> implements JwtToken<P> {
    readonly signature: string;

    constructor(readonly payload: P) {
        const jwtPayload: JwtRefreshTokenPayload = {
            sub: this.payload.sub,
        };
        this.signature = jwt.sign(
            jwtPayload,
            authConfig.accessToken.secret, {
                expiresIn: authConfig.accessToken.expiresIn,
            },
        );
    }

    static Verify(signature: string) {
        return jwt.verify(signature, authConfig.refreshToken.secret);
    }
}