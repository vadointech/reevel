import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthService } from "@/modules/auth/auth.service";
import { GoogleOAuthService } from "@/modules/google/services/oauth.service";
import { InjectGoogleOAuthService } from "@/decorators";

@Injectable()
export class GoogleOAuthProvider {
    constructor(
        @InjectGoogleOAuthService("/auth/google/redirect")
        private readonly googleOAuthService: GoogleOAuthService,
        private readonly authService: AuthService,
    ) {}

    getAuthorizationLink() {
        return this.googleOAuthService.generateAuthUrl();
    }

    async authorize(code: string) {
        const user = await this.googleOAuthService.getOAuthUserInfo(code);

        if(!user) {
            throw new BadRequestException();
        }

        try {
            return await this.authService.login(user);
        } catch(error) {
            if(error instanceof NotFoundException) {
                return this.authService.register(user);
            }
            throw error;
        }
    }
}