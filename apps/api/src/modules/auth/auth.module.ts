import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleModule } from "@/modules/google/google.module";
import { CookieService } from "@/services/cookie.service";

@Module({
    imports: [
        GoogleModule.forFeature(["/auth/google/redirect"]),
    ],
    controllers: [AuthController],
    providers: [CookieService, AuthService],
})
export class AuthModule {}