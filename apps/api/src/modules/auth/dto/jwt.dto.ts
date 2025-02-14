import { IsNotEmpty, IsString } from "class-validator";
import { ClientSession } from "@/modules/auth/dto/auth.dto";

export class AccessJwtTokenPayload {
    sub: string;
    email: string;
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
    session: ClientSession;
}