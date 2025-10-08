import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { LoginUserDto, RegisterUserDto, SessionResponseDto } from "./dto/auth.dto";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { SubscriptionRepository } from "@/modules/subscription/subscription.repository";
import { ServerSession } from "@/types";
import bcrypt from "bcryptjs";
import { AuthSessionService } from "@/modules/auth/services";

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);

    constructor(
        private readonly sessionService: AuthSessionService,

        private readonly userRepository: UserRepository,
        private readonly profileRepository: ProfileRepository,
        private readonly subscriptionRepository: SubscriptionRepository,

        private readonly dataSource: DataSource,
    ) { }

    async register(input: RegisterUserDto): Promise<SessionResponseDto> {
        try {
            const session = await this.dataSource.transaction(async entityManager => {
                const user = await this.userRepository.createAndSave({
                    email: input.email,
                }, entityManager);

                user.profile = await this.profileRepository.createAndSave({
                    userId: user.id,
                    picture: input.picture,
                    fullName: input.name,
                }, entityManager);

                user.subscription = await this.subscriptionRepository.createAndSave({
                    userId: user.id,
                }, entityManager);

                return await this.sessionService.createSession(user);
            });

            await this.saveSession(session);

            return session;
        } catch(error) {
            if(error instanceof Error) {
                this.logger.error(`Unexpected error creating account: ${error.message}`, error.stack);
            }
            throw new BadRequestException();
        }
    }

    async login(input: LoginUserDto): Promise<SessionResponseDto> {
        const user = await this.userRepository.getByEmail(input.email);

        if(!user) {
            throw new NotFoundException();
        }

        const session = await this.sessionService.createSession(user);

        await this.saveSession(session);

        return session;
    }

    async logout(session: ServerSession): Promise<boolean> {
        try {
            return this.userRepository.update({ id: session.user.id }, {
                sessionTokenHash: undefined,
            });
        } catch {
            return true;
        }
    }

    async refreshSession(session: ServerSession): Promise<SessionResponseDto> {
        try {
            const user = await this.userRepository.getSession(session.user.id);

            if(!user || !user.sessionTokenHash) {
                throw new BadRequestException();
            }

            const match = await bcrypt.compare(session.user.token, user.sessionTokenHash);

            if(!match) {
                throw new BadRequestException();
            }
            return this.sessionService.createSession(user);
        } catch {
            throw new UnauthorizedException();
        }
    }

    private async saveSession(session: SessionResponseDto) {
        const sessionTokenHash = await bcrypt.hash(session.refreshToken, 10);

        return this.userRepository.update({ id: session.payload.sub }, {
            sessionTokenHash,
        });
    }
}
