import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectGoogleOAuthService } from "@/decorators";
import { UserService } from "@/modules/user/user.service";
import { ProfileService } from "@/modules/profile/profile.service";
import { GoogleOAuthService } from "@/modules/google/services/oauth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtSession } from "./dto/jwt.dto";
import { GoogleOAuthUserInfo } from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService,
        private readonly jwtStrategy: JwtStrategy,
        @InjectGoogleOAuthService("/auth/google/redirect")
        private readonly googleOAuthService: GoogleOAuthService,
    ) {}

    async getGoogleOAuthLink(): Promise<string> {
        return this.googleOAuthService.generateAuthUrl();
    }

    async getGoogleOAuthUser(code: string): Promise<GoogleOAuthUserInfo> {
        const credentials = await this.googleOAuthService.getOAuthTokens(code);

        if(!credentials.access_token || !credentials.refresh_token) {
            throw new BadRequestException("Bad Request");
        }

        const user = await this.googleOAuthService.getUserInfo(credentials.access_token);

        if(!user?.email) {
            throw new BadRequestException("Bad Request");
        }

        return {
            email: user.email,
            name: user.name,
            picture: user.picture,
        } as GoogleOAuthUserInfo;
    }

    async authWithGoogle(oauthUser: GoogleOAuthUserInfo): Promise<JwtSession> {
        const dbUser = await this.userService.getByEmail(oauthUser.email);

        if(dbUser) return this.loginUser(oauthUser.email);
        return this.registerUser(oauthUser);
    }

    async registerUser(oauthUser: GoogleOAuthUserInfo): Promise<JwtSession> {
        const user = await this.userService.createUser({ email: oauthUser.email });

        await this.profileService.createProfile({
            userId: user.id,
            picture: oauthUser.picture,
            fullName: oauthUser.name,
        });

        return this.jwtStrategy.generateSession(user);
    }

    async loginUser(email: string): Promise<JwtSession> {
        const user = await this.userService.getByEmail(email);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return this.jwtStrategy.generateSession(user);
    }
}
