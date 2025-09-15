import { Reflector } from "@nestjs/core";
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Scope } from "@nestjs/common";
import { AuthSessionService, AuthTokensService } from "../services";
import { PUBLIC_DECORATOR_KEY } from "@/decorators";

@Injectable({ scope: Scope.REQUEST })
export class AccessTokenGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly sessionService: AuthSessionService,
        private readonly tokenService: AuthTokensService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride(PUBLIC_DECORATOR_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(isPublic) return true;

        const request = context.switchToHttp().getRequest();

        try {
            const token = this.sessionService.extractTokenFromHeaders(request);
            if(!token) {
                throw new UnauthorizedException();
            }

            const validToken = await this.tokenService.verifyAccessToken(token);

            this.sessionService.setServerSession(request, token, validToken);
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}