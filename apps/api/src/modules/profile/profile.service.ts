import { Injectable } from "@nestjs/common";
import { ProfileEntity } from "./entities/profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProfileDto } from "@/modules/profile/dto/create-profile.dto";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
    ) {}

    createProfile(input: CreateProfileDto): Promise<ProfileEntity> {
        const profile = this.profileRepository.create({
            fullName: input.fullName,
            picture: input.picture,
            userId: input.userId,
        });

        return this.profileRepository.save(profile);
    }
}
