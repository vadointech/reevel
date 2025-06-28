import authConfig from "@/modules/auth/auth.config";
import { JwtService } from "@nestjs/jwt";
import {
    Injectable,
    Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CookieService } from "@/services/cookie.service";
import { UserEntity } from "@/modules/user/entities/user.entity";
import {
    JwtSession,
    ServerSession,
    SessionJwtTokenPayload,
} from "../dto/jwt.dto";

@Injectable()
export class JwtStrategy {
    private logger = new Logger(JwtStrategy.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly cookieService: CookieService,
        // private readonly sessionRepository: UserSessionRepository,
    ) {}

    async createSession(user: UserEntity): Promise<JwtSession> {
        // const initialRefreshTokenHash = crypto.randomBytes(8).toString();

        // const session = await this.sessionRepository.insert({
        //     userId: user.id,
        //     refreshTokenHash: initialRefreshTokenHash,
        // });

        // if(!session) {
        //     this.logger.error("Unexpected error creating session: Could not create session.");
        //     throw new InternalServerErrorException();
        // }

        const tokens = await this.generateTokens({
            sub: user.id,
            sid: user.id,
            email: user.email,
            completed: user.profile.completed,
            subscription: user.subscription.type,
            location: user.profile.location ? {
                id: user.profile.location?.id,
                coordinates: user.profile.location?.center?.coordinates,
            }: undefined,
        });

        // const sessionTokenHash = await bcrypt.hash(tokens.refresh_token, 10);
        // await this.sessionRepository.updateSessionToken(session.id, sessionTokenHash, authConfig.session.expiresIn);

        return tokens;
    }

    async refreshSession(refreshToken: string, payload: SessionJwtTokenPayload): Promise<JwtSession> {
        // const session = await this.sessionRepository.findOneBy({ id: payload.sid });
        // if(!session || new Date() > session.expiresAt) {
        //     throw new UnauthorizedException("Session expired");
        // }

        // const isTokenMatching = await bcrypt.compare(refreshToken, session.refreshTokenHash);
        // if(!isTokenMatching) {
        //     await this.sessionRepository.delete({ id: payload.sid });
        //     throw new UnauthorizedException("Invalid refresh token");
        // }

        const tokens = await this.generateTokens(payload);

        // const refreshTokenHash = await bcrypt.hash(tokens.refresh_token, 10);
        // await this.sessionRepository.updateSessionToken(session.id, refreshTokenHash, authConfig.session.expiresIn);

        return tokens;
    }

    setServerSession(request: Request, payload: SessionJwtTokenPayload) {
        request["user"] = {
            user: {
                id: payload.sub,
                sid: payload.sid,
                email: payload.email,
                subscription: payload.subscription,
                location: payload.location,
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
        payload?: SessionJwtTokenPayload;
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

    private async generateTokens(payload: SessionJwtTokenPayload): Promise<JwtSession> {

        const accessTokenPayload: SessionJwtTokenPayload = {
            sub: payload.sub,
            sid: payload.sid,
            email: payload.email,
            completed: payload.completed,
            subscription: payload.subscription,
            location: payload.location,
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
    private async generateAccessToken(payload: SessionJwtTokenPayload) {
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