import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    Scope,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request, Response } from "express";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";
import { AuthJwtTokens } from "../dto/jwt.dto";
import { transformAndValidate } from "class-transformer-validator";

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtStrategy: JwtStrategy,
        private reflector: Reflector,
    ) {}

    async getAuthJwtToken(request: Request): Promise<AuthJwtTokens>;
    async getAuthJwtToken(request: Request, key?: keyof AuthJwtTokens): Promise<string>;
    async getAuthJwtToken(request: Request, key?: keyof AuthJwtTokens) {
        const cookies = request.headers.cookie;

        if(!cookies) {
            throw new BadRequestException("Access or Refresh token not found");
        }

        const tokens = cookies.split("; ");

        const tokensMap: Record<string, string> = {};

        tokens.forEach((token) => {
            const [key, value] = token.split("=");
            tokensMap[key] = decodeURIComponent(value).replace(/^"|"$/g, "");
        });

        try {
            const validatedTokens = await transformAndValidate(AuthJwtTokens, tokensMap);
            if(key) return validatedTokens[key];
            return validatedTokens;
        } catch {
            throw new BadRequestException("Access or Refresh token not found");
        }
    }

    isPublicRoute(context: ExecutionContext): boolean {
        return this.reflector.getAllAndOverride("isPublic", [
            context.getHandler(),
            context.getClass(),
        ]);
    }

    async checkUserAccess(request: Request): Promise<boolean> {
        const accessToken = await this.getAuthJwtToken(request, "access_token");


        const {
            valid,
            payload,
        } = await this.jwtStrategy.validateAccessToken(accessToken);

        if(!valid || !payload) {
            return false;
        }

        this.jwtStrategy.setServerSession(request, payload);

        return true;
    }

    async refreshUserAccess(request: Request, response: Response) {
        const refreshToken = await this.getAuthJwtToken(request, "refresh_token");

        const {
            valid,
            payload,
        } = await this.jwtStrategy.validateRefreshToken(refreshToken);

        if(!valid || !payload) {
            throw new UnauthorizedException("Invalid refresh token");
        }

        await this.jwtStrategy.refreshSession(request, response, payload);
    }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.isPublicRoute(context);
        if(isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        try {
            const hasAccess = await this.checkUserAccess(request);

            if(hasAccess) return true;

            await this.refreshUserAccess(request, response);

            return true;
        } catch {
            return false;
        }
    }
}