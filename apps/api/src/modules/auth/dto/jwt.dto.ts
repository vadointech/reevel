import { IsNotEmpty, IsString } from "class-validator";

export interface IAuthJwtTokens {
    access_token: string;
    refresh_token: string;
}

interface AuthConfigOption {
    secret: string;
    cookieKey: string;
    expiresIn: string | number;
}
export interface AuthConfig {
    accessToken: AuthConfigOption,
    refreshToken: AuthConfigOption,
}

export class AuthJwtTokens implements IAuthJwtTokens {
    @IsString()
    @IsNotEmpty()
    access_token: string;
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}