import { IsNotEmpty, IsString } from "class-validator";
import { SubscriptionType } from "@/modules/subscription/entities/subscription.entity";

export class AccessJwtTokenPayload {
    sub: string;
    email: string;
    completed: string;
    subscription: SubscriptionType;
}

export type RefreshJwtTokenPayload = {
    sub: string;
    email: string;
};

export class AuthJwtTokens {
    @IsString()
    @IsNotEmpty()
    access_token: string;
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}

export class JwtSession {
    tokens: AuthJwtTokens;
    payload: AccessJwtTokenPayload;
}

export class ServerSession {
    user: {
        id: string;
        email: string;
        subscription: SubscriptionType;
    };
}