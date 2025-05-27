import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { ProfileInterestsRepository } from "@/modules/profile/repositories/profile-interests.repository";
import { Session } from "@/types";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly profileInterestsRepository: ProfileInterestsRepository,
    ) {}

    getUserSession(userId: string) {
        return this.userRepository.getSession(userId);
    }

    getUserInterests(session: Session) {
        return this.profileInterestsRepository.findMany({
            where: { profile: { userId: session.user.id }},
            relations: {
                interest: true,
            },
        });
    }
}
