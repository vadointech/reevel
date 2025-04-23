import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleModule } from "@/modules/google/google.module";
import { CookieService } from "@/services/cookie.service";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";
import { JwtService } from "@nestjs/jwt";
import { ProfileModule } from "@/modules/profile/profile.module";
import { UserRepository } from "@/modules/user/user.repository";
import { ProfileRepository } from "@/modules/profile/profile.repository";
import { SubscriptionRepository } from "@/modules/subscription/subscription.repository";
import { EventRepository } from "@/modules/event/repositories/event.repository";

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

        CookieService,

        EventRepository,
        UserRepository,
        ProfileRepository,
        SubscriptionRepository,
    ],
    exports: [JwtStrategy],
})
export class AuthModule {}