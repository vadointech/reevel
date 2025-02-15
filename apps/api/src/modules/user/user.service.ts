import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "@/modules/user/dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({
            where: { email },
        });
    }

    async getUserById(id: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({
            where: { id },
        });
    }

    async createUser(data: CreateUserDto): Promise<UserEntity> {
        const user = this.userRepository.create({
            email: data.email,
        });

        return this.userRepository.save(user);
    }

    async getUserSession(userId: string) {
        return this.userRepository.findOne({
            where: { id: userId },
            select: {
                id: true,
                email: true,
            },
        });
    }
}
