import { IsNotEmpty, IsString } from "class-validator";
import { JwtAccessTokenPayload } from "@/modules/auth/dto/jwt-token.dto";

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;
}

export class RegisterUserDto extends LoginUserDto {
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsNotEmpty()
    picture?: string;
}

export class RefreshSessionDto {
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}

export class SessionResponseDto {
    accessToken: string;
    refreshToken: string;
    payload: JwtAccessTokenPayload;
}