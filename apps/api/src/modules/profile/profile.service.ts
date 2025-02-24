import { Injectable, NotFoundException } from "@nestjs/common";
import { ProfileEntity } from "./entities/profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateProfileDto } from "@/modules/profile/dto/create-profile.dto";
import { UpdateProfileDto } from "@/modules/profile/dto/update-profile.dto";
import { ProfileInterestsEntity } from "@/modules/profile/entities/profile-interests.entity";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
        private dataSource: DataSource,
    ) {}

    async createProfile(input: CreateProfileDto): Promise<ProfileEntity> {
        const profile = this.profileRepository.create({
            fullName: input.fullName,
            picture: input.picture,
            userId: input.userId,
        });

        return this.profileRepository.save(profile);
    }

    async updateProfile(profileId: string, input: UpdateProfileDto) {
        const dbProfile = await this.profileRepository.findOne({
            where: { id: profileId },
        });

        if (!dbProfile) {
            throw new NotFoundException();
        }

        const newProfile = Object.assign(dbProfile, input, {
            location: input.location ? {
                type: "Point",
                coordinates: input.location,
            } : dbProfile.location,
        });

        await this.profileRepository.save(newProfile);

        if (input.interests?.length) {
            await this.dataSource.transaction(async entityManager => {
                if(!input.interests) return;

                await entityManager.delete(ProfileInterestsEntity, { profileId });

                const interests = input.interests?.map(interestId =>
                    entityManager.create(ProfileInterestsEntity, { profileId, interestId }),
                );

                await entityManager.save(ProfileInterestsEntity, interests);
            });
        }

        return newProfile;
    }

}
