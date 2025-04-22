import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectGoogleOAuthService } from "@/decorators";
import { GoogleOAuthService } from "@/modules/google/services/oauth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtSession } from "./dto/jwt.dto";
import { GoogleOAuthUserInfo } from "./dto/auth.dto";
import { UserRepository } from "@/modules/user/user.repository";
import { ProfileRepository } from "@/modules/profile/profile.repository";
import { SubscriptionRepository } from "@/modules/subscription/subscription.repository";

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);

    constructor(
        @InjectGoogleOAuthService("/auth/google/redirect")
        private readonly googleOAuthService: GoogleOAuthService,
        private readonly jwtStrategy: JwtStrategy,

        private readonly userRepository: UserRepository,
        private readonly profileRepository: ProfileRepository,
        private readonly subscriptionRepository: SubscriptionRepository,

        private readonly dataSource: DataSource,
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

    async authWithGoogle(oauthUser: GoogleOAuthUserInfo) {
        const dbUser = await this.userRepository.getByEmail(oauthUser.email);

        if(dbUser) {
            return await this.loginUser(oauthUser.email);
        } else {
            return await this.registerUser(oauthUser);
        }
    }

    async registerUser(oauthUser: GoogleOAuthUserInfo): Promise<JwtSession> {
        const user = await this.createAccount(oauthUser);
        return this.jwtStrategy.generateSession(user);
    }

    async loginUser(email: string): Promise<JwtSession> {
        const user = await this.userRepository.getByEmail(email);

        if (!user) {
            throw new NotFoundException();
        }

        return this.jwtStrategy.generateSession(user);
    }

    async createAccount(oauthUser: GoogleOAuthUserInfo) {
        try {
            return this.dataSource.transaction(async entityManager => {
                const user = await this.userRepository.create(oauthUser, entityManager);
                user.profile = await this.profileRepository.create({
                    userId: user.id,
                    picture: oauthUser.picture,
                    fullName: oauthUser.name,
                    completed: "false",
                }, entityManager);
                user.subscription = await this.subscriptionRepository.create({
                    userId: user.id,
                }, entityManager);

                return user;
            });
        } catch(error) {
            this.logger.error(`Unexpected error creating account: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }
}
