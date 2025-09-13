import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleModule } from "@/modules/google/google.module";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";
import { JwtService } from "@nestjs/jwt";
import { ProfileModule } from "@/modules/profile/profile.module";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { SubscriptionRepository } from "@/modules/subscription/subscription.repository";
import { UserSessionRepository } from "@/modules/user/repositories/user-session.repository";
import { GoogleOAuthProvider } from "@/modules/auth/providers/google-auth.provider";

@Module({
    imports: [
        GoogleModule.forFeature(["/auth/google/redirect"]),
        ProfileModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtService,
        JwtStrategy,
        GoogleOAuthProvider,

        UserRepository,
        UserSessionRepository,
        ProfileRepository,
        SubscriptionRepository,
    ],
    exports: [JwtStrategy],
})
export class AuthModule {}