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
import { PUBLIC_DECORATOR_KEY } from "@/decorators";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly jwtStrategy: JwtStrategy,
    ) {}

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride(PUBLIC_DECORATOR_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        console.log(token);

        try {
            return false;
        } catch {
            return false;
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") || [];
        return type === "Bearer" ? token : undefined;
    }
}