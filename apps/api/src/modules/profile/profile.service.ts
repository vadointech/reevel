import { Injectable, NotFoundException } from "@nestjs/common";
import { ProfileEntity } from "./entities/profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateProfileDto } from "@/modules/profile/dto/create-profile.dto";
import { UpdateProfileDto } from "@/modules/profile/dto/update-profile.dto";
import { ProfileInterestsEntity } from "@/modules/profile/entities/profile-interests.entity";
import { InterestsEntity } from "../interests/entities/interests.entity";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,

        @InjectRepository(InterestsEntity)
        private readonly interestRepository: Repository<InterestsEntity>,

        private dataSource: DataSource,
    ) { }

    async createProfile(input: CreateProfileDto): Promise<ProfileEntity> {
        const profile = this.profileRepository.create({
            fullName: input.fullName,
            picture: input.picture,
            userId: input.userId,
            completed: "false",
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

    async getUserInterests(userId: string) {
        const userWithInterests = await this.profileRepository.findOne({
            where: { userId },
            relations: {
                interests: {
                    interest: true,
                },
            },
        });

        const userInterests = userWithInterests?.interests
            ?.map(i => i.interest)
            ?.slice(0, 5) || [];

        const userInterestIds = userInterests.map(i => i.slug) || [];

        const limit = 8;

        const randomInterests = await this.interestRepository
            .createQueryBuilder("interest")
            .where(userInterestIds.length ? "interest.slug NOT IN (:...userInterestIds)" : "1=1", { userInterestIds })
            .orderBy("RANDOM()")
            .limit(limit - userInterests.length)
            .getMany();



        return {
            userInterests: userInterests.concat(randomInterests),
        };
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
            completed,
        } = input;

        const newProfile = Object.assign(dbProfile, {
            fullName,
            bio,
            picture,
            completed,
            location: location ? {
                type: "Point",
                coordinates: location,
            } : dbProfile.location,
        });

        await this.profileRepository.save(newProfile);

        if (interests) {
            await this.dataSource.transaction(async entityManager => {
                if (!interests) return;

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
