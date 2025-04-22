import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    getUserSession(userId: string) {
        return this.userRepository.getSession(userId);
    }
}
