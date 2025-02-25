import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleModule } from "@/modules/google/google.module";
import { CookieService } from "@/services/cookie.service";
import { UserModule } from "@/modules/user/user.module";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";
import { JwtService } from "@nestjs/jwt";
import { ProfileModule } from "@/modules/profile/profile.module";

@Module({
    imports: [
        GoogleModule.forFeature(["/auth/google/redirect"]),
        UserModule,
        ProfileModule,
    ],
    controllers: [AuthController],
    providers: [CookieService, AuthService, JwtService, JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule {}