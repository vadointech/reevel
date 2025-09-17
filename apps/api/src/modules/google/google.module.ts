import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@/config/config.service";
import { GoogleOAuthService } from "@/modules/google/services/oauth.service";

@Module({})
export class GoogleModule {
    static forFeature(redirectURis: string[]): DynamicModule {
        const providers = redirectURis.map(dependencyName => {

            /**
            * DependencyName is Google OAuth Redirect URI
            */

            return {
                provide: dependencyName,
                inject: [
                    ConfigService,
                ],
                useFactory: (
                    configService: ConfigService,
                ) => {
                    return new GoogleOAuthService({
                        clientId: configService.env("GOOGLE_CLIENT_ID"),
                        clientSecret: configService.env("GOOGLE_CLIENT_SECRET"),
                        redirectUrl: configService.env("API_PUBLIC_URL") + dependencyName,
                    });
                },
            };
        });

        return {
            providers,
            exports: providers,
            module: GoogleModule,
        };
    }
}
