import authConfig from "@/modules/auth/auth.config";
import { JwtService } from "@nestjs/jwt";
import {
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CookieService } from "@/services/cookie.service";
import { UserEntity } from "@/modules/user/entities/user.entity";
import {
    JwtSession,
    ServerSession,
    AccessJwtTokenPayload,
    SessionJwtTokenPayload,
} from "../dto/jwt.dto";
import { UserSessionRepository } from "@/modules/user/repositories/user-session.repository";

import bcrypt from "bcryptjs";
import crypto from "crypto";

@Injectable()
export class JwtStrategy {
    private logger = new Logger(JwtStrategy.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly cookieService: CookieService,
        private readonly sessionRepository: UserSessionRepository,
    ) {}

    async createSession(user: UserEntity): Promise<JwtSession> {
        const initialRefreshTokenHash = crypto.randomBytes(8).toString();

        const session = await this.sessionRepository.create({
            userId: user.id,
            refreshTokenHash: initialRefreshTokenHash,
        });

        if(!session) {
            this.logger.error("Unexpected error creating session: Could not create session.");
            throw new InternalServerErrorException();
        }

        const tokens = await this.generateTokens({
            sub: user.id,
            sid: session.id,
            email: user.email,
            completed: user.profile.completed,
            subscription: user.subscription.type,
        });

        const sessionTokenHash = await bcrypt.hash(tokens.refresh_token, 10);
        await this.sessionRepository.updateSessionToken(session.id, sessionTokenHash, authConfig.session.expiresIn);

        return tokens;
    }

    async refreshSession(refreshToken: string, payload: SessionJwtTokenPayload): Promise<JwtSession> {
        const session = await this.sessionRepository.findOneBy({ id: payload.sid });
        if(!session || new Date() > session.expiresAt) {
            throw new UnauthorizedException();
        }

        const isTokenMatching = await bcrypt.compare(refreshToken, session.refreshTokenHash);
        if(!isTokenMatching) {
            await this.sessionRepository.delete({ id: payload.sid });
            throw new UnauthorizedException();
        }

        const tokens = await this.generateTokens(payload);

        const refreshTokenHash = await bcrypt.hash(tokens.refresh_token, 10);
        await this.sessionRepository.updateSessionToken(session.id, refreshTokenHash, authConfig.session.expiresIn);

        return tokens;
    }

    setServerSession(request: Request, payload: AccessJwtTokenPayload) {
        request["user"] = {
            user: {
                id: payload.sub,
                sid: payload.sid,
                email: payload.email,
                subscription: payload.subscription,
            },
        } satisfies ServerSession;
    }

    setJwtSession(response: Response, session: JwtSession) {
        this.cookieService.setHttpCookie(response, authConfig.session.cookieKey, session.session_id);
        this.cookieService.setHttpCookie(response, authConfig.accessToken.cookieKey, session.access_token);
        this.cookieService.setHttpCookie(response, authConfig.refreshToken.cookieKey, session.refresh_token);
    }

    clearJwtSession(response: Response) {
        this.cookieService.clearHttpCookie(response, authConfig.session.cookieKey);
        this.cookieService.clearHttpCookie(response, authConfig.accessToken.cookieKey);
        this.cookieService.clearHttpCookie(response, authConfig.refreshToken.cookieKey);
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
        payload?: SessionJwtTokenPayload;
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

    private async generateTokens(payload: AccessJwtTokenPayload): Promise<JwtSession> {

        const accessTokenPayload: AccessJwtTokenPayload = {
            sub: payload.sub,
            sid: payload.sid,
            email: payload.email,
            completed: payload.completed,
            subscription: payload.subscription,
        };
        const refreshTokenPayload: SessionJwtTokenPayload = { ...accessTokenPayload };

        const [access_token, refresh_token] = await Promise.all([
            this.generateAccessToken(accessTokenPayload),
            this.generateRefreshToken(refreshTokenPayload),
        ]);

        return {
            payload: accessTokenPayload,
            session_id: payload.sid,
            access_token,
            refresh_token,
        };
    }
    private async generateAccessToken(payload: AccessJwtTokenPayload) {
        return this.jwtService.sign(payload, {
            secret: authConfig.accessToken.secret,
            expiresIn: authConfig.accessToken.expiresIn,
        });
    }
    private async generateRefreshToken(payload: SessionJwtTokenPayload) {
        return this.jwtService.sign(payload, {
            secret: authConfig.refreshToken.secret,
            expiresIn: authConfig.refreshToken.expiresIn,
        });
    }
}