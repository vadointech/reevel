import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleModule } from "@/modules/google/google.module";
import { CookieService } from "@/services/cookie.service";
import { UserModule } from "@/modules/user/user.module";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";
import { JwtService } from "@nestjs/jwt";
import { ProfileModule } from "@/modules/profile/profile.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@/modules/user/entities/user.entity";

@Module({
    imports: [
        GoogleModule.forFeature(["/auth/google/redirect"]),
        TypeOrmModule.forFeature([UserEntity]),
        UserModule,
        ProfileModule,
    ],
    controllers: [AuthController],
    providers: [CookieService, AuthService, JwtService, JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule {}