import * as jose from "jose";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AUTH_MODULE_CONFIG, AuthModuleConfig } from "../auth.config";
import { JwtAccessTokenPayload, JwtRefreshTokenPayload } from "../types/tokens";

@Injectable()
export class AuthTokensService {
    private readonly issuer = "urn:example:issuer";
    private readonly audience = "urn:example:audience";

    constructor(
        @Inject(AUTH_MODULE_CONFIG)
        private readonly authConfig: AuthModuleConfig,
    ) {}

    async signAccessToken(payload: JwtAccessTokenPayload): Promise<string> {
        const secret = new TextEncoder().encode(this.authConfig.accessToken.secret);

        return new jose.SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setIssuer(this.issuer)
            .setAudience(this.audience)
            .setSubject(payload.sub)
            .setExpirationTime(this.authConfig.accessToken.expiresIn)
            .sign(secret);
    }

    async signRefreshToken(payload: JwtRefreshTokenPayload): Promise<string> {
        const secret = new TextEncoder().encode(this.authConfig.refreshToken.secret);

        return new jose.SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setIssuer(this.issuer)
            .setAudience(this.audience)
            .setSubject(payload.sub)
            .setExpirationTime(this.authConfig.refreshToken.expiresIn)
            .sign(secret);
    }

    async verifyAccessToken(token: string): Promise<JwtAccessTokenPayload> {
        const secret = new TextEncoder().encode(this.authConfig.accessToken.secret);

        try {
            const { payload } = await jose.jwtVerify(token, secret, {
                issuer: this.issuer,
                audience: this.audience,
            });
            return payload as JwtAccessTokenPayload;
        } catch {
            throw new UnauthorizedException("Access token is invalid or expired.");
        }
    }

    async verifyRefreshToken(token: string): Promise<JwtRefreshTokenPayload> {
        const secret = new TextEncoder().encode(this.authConfig.refreshToken.secret);

        try {
            const { payload } = await jose.jwtVerify(token, secret, {
                issuer: this.issuer,
                audience: this.audience,
            });
            return payload as JwtRefreshTokenPayload;
        } catch {
            throw new UnauthorizedException("Refresh token is invalid or expired.");
        }
    }
}