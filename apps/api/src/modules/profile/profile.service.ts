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

    async getProfile(userId: string) {
        return this.profileRepository.findOne({
            where: { userId },
            relations: {
                interests: {
                    interest: true,
                },
            },
        });
    }

    async updateProfile(userId: string, input: UpdateProfileDto) {
        const dbProfile = await this.profileRepository.findOne({
            where: { userId: userId },
        });

        if (!dbProfile) {
            throw new NotFoundException();
        }

        const { id: profileId } = dbProfile;

        const {
            fullName,
            bio,
            picture,
            location,
            interests,
        } = input;

        const newProfile = Object.assign(dbProfile, {
            fullName,
            bio,
            picture,
            location: location ? {
                type: "Point",
                coordinates: location,
            } : dbProfile.location,
        });

        await this.profileRepository.save(newProfile);

        if(interests) {
            await this.dataSource.transaction(async entityManager => {
                if(!interests) return;

                await entityManager.delete(ProfileInterestsEntity, { profileId });

                const newInterests = interests.map(interestId =>
                    entityManager.create(ProfileInterestsEntity, { profileId, interestId }),
                );

                await entityManager.save(ProfileInterestsEntity, newInterests);
            });
        }

        return newProfile;
    }

}
