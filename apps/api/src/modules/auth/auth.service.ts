import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LoginUserDto, RefreshSessionDto, RegisterUserDto, SessionResponseDto } from "./dto/auth.dto";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { SubscriptionRepository } from "@/modules/subscription/subscription.repository";
import { ServerSession } from "@/types";

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);

    constructor(
        private readonly jwtStrategy: JwtStrategy,

        private readonly userRepository: UserRepository,
        private readonly profileRepository: ProfileRepository,
        private readonly subscriptionRepository: SubscriptionRepository,

        private readonly dataSource: DataSource,
    ) {}

    async refreshSession(session: ServerSession, input: RefreshSessionDto): Promise<void> {

    }

    async logout(session: ServerSession): Promise<boolean> {
        return true;
    }

    async login(input: LoginUserDto): Promise<SessionResponseDto> {
        const user = await this.userRepository.getByEmail(input.email);

        if(!user) {
            throw new NotFoundException();
        }

        return this.jwtStrategy.createSession(user);
    }

    async register(input: RegisterUserDto): Promise<SessionResponseDto> {
        try {
            const user = await this.dataSource.transaction(async entityManager => {
                const user = await this.userRepository.createAndSave({
                    email: input.email,
                }, entityManager);

                user.profile = await this.profileRepository.createAndSave({
                    userId: user.id,
                    picture: input.picture,
                    fullName: input.name,
                    completed: "false",
                }, entityManager);

                user.subscription = await this.subscriptionRepository.createAndSave({
                    userId: user.id,
                }, entityManager);

                return user;
            });

            return this.jwtStrategy.createSession(user);
        } catch(error) {
            if(error instanceof Error) {
                this.logger.error(`Unexpected error creating account: ${error.message}`, error.stack);
            }
            throw new BadRequestException();
        }
    }
}
