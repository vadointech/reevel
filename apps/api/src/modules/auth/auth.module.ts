import { DynamicModule, Module, Provider } from "@nestjs/common";
import { AuthSessionService, AuthTokensService } from "./services";
import { AuthController } from "./auth.controller";
import { GoogleModule } from "@/modules/google/google.module";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { SubscriptionRepository } from "@/modules/subscription/subscription.repository";
import { AUTH_MODULE_CONFIG, AuthModuleConfig } from "./auth.config";
import { ConfigService } from "@/config/config.service";
import { AuthModuleConfigParams } from "./types/config";
import { AuthService } from "./auth.service";
import { GoogleOAuthProvider } from "./providers";

@Module({})
export class AuthModule {
    static forRoot(params: AuthModuleConfigParams = {}): DynamicModule {
        const providers: Provider[] = [
            {
                provide: AUTH_MODULE_CONFIG,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => {
                    return new AuthModuleConfig({
                        accessToken: {
                            secret: configService.env("ACCESS_JWT_SECRET"),
                            cookieKey: "access_token",
                            expiresIn: "18m",
                            ...params.accessToken,
                        },
                        refreshToken: {
                            secret: configService.env("REFRESH_JWT_SECRET"),
                            cookieKey: "refresh_token",
                            expiresIn: "30d",
                            ...params.refreshToken,
                        },
                    });
                },
            },
            AuthService,
            AuthTokensService,
            AuthSessionService,

            GoogleOAuthProvider,

            UserRepository,
            ProfileRepository,
            SubscriptionRepository,
        ];

        return {
            providers,
            imports: [
                GoogleModule.forFeature(["/auth/google/redirect"]),
            ],
            controllers: [AuthController],
            exports: providers,
            module: AuthModule,
        };
    }
}