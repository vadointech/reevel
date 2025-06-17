import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UpdateProfileDto } from "@/modules/profile/dto/update-profile.dto";
import { ProfileInterestsEntity } from "@/modules/profile/entities/profile-interests.entity";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { ProfileLocationRepository } from "@/modules/profile/repositories/profile-location.repository";
import { ProfileLocationsEntity } from "@/modules/profile/entities/profile-location.entity";
import { Session } from "@/types";
import { SupportedFileCollections } from "@/modules/uploads/entities/uploads.entity";
import { UploadsService } from "@/modules/uploads/uploads.service";

@Injectable()
export class ProfileService {
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly profileLocationsRepository: ProfileLocationRepository,
        private readonly uploadsService: UploadsService,

        private dataSource: DataSource,
    ) {}

    async updateProfile(userId: string, input: UpdateProfileDto) {
        const dbProfile = await this.profileRepository.findOne({
            where: { userId: userId },
            relations: {
                location: true,
            },
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
        });

        await this.dataSource.transaction(async entityManager => {
            await this.profileRepository.save(dbProfile, entityManager);

            if(location) {
                const locationOptions: Partial<ProfileLocationsEntity> = {
                    center: {
                        type: "Point",
                        coordinates: location.center,
                    },
                    bbox: {
                        type: "Polygon",
                        coordinates: [[
                            [location.bbox[0], location.bbox[1]], // SW corner
                            [location.bbox[0], location.bbox[3]], // NW corner
                            [location.bbox[2], location.bbox[3]], // NE corner
                            [location.bbox[2], location.bbox[1]], // SE corner
                            [location.bbox[0], location.bbox[1]],  // Back to SW to close polygon
                        ]],
                    },
                };

                await this.profileLocationsRepository.delete({ profileId }, entityManager);
                newProfile.location = await this.profileLocationsRepository.create({
                    profileId,
                    ...locationOptions,
                }, entityManager);
            }
        });

        if(interests) {
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

    async uploadAvatar(session: Session, files: Express.Multer.File[]) {
        return this.uploadsService.uploadImages(
            session,
            files,
            SupportedFileCollections.PROFILE_PICTURE,
        );
    }
}
