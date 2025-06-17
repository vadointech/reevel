import { IsNotEmpty, IsString } from "class-validator";
import { SubscriptionType } from "@/modules/subscription/entities/subscription.entity";

export interface IAuthJwtTokens {
    access_token: string;
    refresh_token: string;
    session_id: string;
}

interface AuthConfigOption {
    secret: string;
    expiresIn: string | number;
    cookieKey: keyof IAuthJwtTokens;
}
export interface AuthConfig {
    accessToken: AuthConfigOption,
    refreshToken: AuthConfigOption,
    session: AuthConfigOption
}

export class AuthJwtTokens implements IAuthJwtTokens {
    @IsString()
    @IsNotEmpty()
    access_token: string;
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
    @IsString()
    @IsNotEmpty()
    session_id: string;
}

export interface AccessJwtTokenPayload {
    sub: string;
    sid: string;
    email: string;
    completed: string;
    subscription: SubscriptionType;
}

export type SessionJwtTokenPayload = AccessJwtTokenPayload;

export interface JwtSession extends AuthJwtTokens {
    payload: SessionJwtTokenPayload;
}

export class ServerSession {
    user: {
        id: string;
        sid?: string;
        email: string;
        subscription: SubscriptionType;
    };
}