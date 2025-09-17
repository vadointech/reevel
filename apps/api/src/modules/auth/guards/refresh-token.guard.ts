import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Scope } from "@nestjs/common";
import { AuthSessionService, AuthTokensService } from "../services";

@Injectable({ scope: Scope.REQUEST })
export class RefreshTokenGuard implements CanActivate {
    constructor(
        private readonly sessionService: AuthSessionService,
        private readonly tokenService: AuthTokensService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        try {
            const token = this.sessionService.extractTokenFromHeaders(request);
            if(!token) {
                throw new UnauthorizedException();
            }

            const validToken = await this.tokenService.verifyRefreshToken(token);
            this.sessionService.setBaseServerSession(request, token, validToken);
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}