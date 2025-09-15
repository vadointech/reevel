import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UpdateProfileDto } from "@/modules/profile/dto/update-profile.dto";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { ProfileLocationRepository } from "@/modules/profile/repositories/profile-location.repository";
import { ServerSession } from "@/types";
import { SupportedFileCollections } from "@/modules/uploads/entities/uploads.entity";
import { UploadsService } from "@/modules/uploads/uploads.service";
import { ProfileInterestsRepository } from "@/modules/profile/repositories/profile-interests.repository";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";

@Injectable()
export class ProfileService {
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly profileLocationsRepository: ProfileLocationRepository,
        private readonly profileInterestsRepository: ProfileInterestsRepository,
        private readonly uploadsService: UploadsService,

        private dataSource: DataSource,
    ) {}

    async updateProfile(userId: string, input: UpdateProfileDto): Promise<ProfileEntity> {
        const dbProfile = await this.profileRepository.findOne({
            where: { userId: userId },
            relations: {
                location: true,
            },
        });

        if (!dbProfile) {
            throw new NotFoundException("Профіль не знайдено");
        }

        const {
            locationCenter,
            locationBbox,
            interests,
            ...newData
        } = input;

        return this.dataSource.transaction(async(entityManager) => {
            for(const [key, value] of Object.entries(newData)) {
                if (value !== undefined) {
                    dbProfile[key] = value;
                }
            }

            if(locationCenter && locationBbox) {
                if (dbProfile.location) {
                    await this.profileLocationsRepository.delete({ id: dbProfile.location.id }, entityManager);
                }
                dbProfile.location = this.profileLocationsRepository.create({
                    center: {
                        type: "Point",
                        coordinates: locationCenter,
                    },
                    bbox: {
                        type: "Polygon",
                        coordinates: [[
                            [locationBbox[0], locationBbox[1]], // SW corner
                            [locationBbox[0], locationBbox[3]], // NW corner
                            [locationBbox[2], locationBbox[3]], // NE corner
                            [locationBbox[2], locationBbox[1]], // SE corner
                            [locationBbox[0], locationBbox[1]],  // Back to SW to close polygon
                        ]],
                    },
                });
            }

            if (interests) {
                await this.profileInterestsRepository.delete({ profileId: dbProfile.id }, entityManager);

                dbProfile.interests = interests.map(interestId =>
                    this.profileInterestsRepository.create({ interestId }),
                );
            }

            return entityManager.save(dbProfile);
        });
    }

    async uploadAvatar(session: ServerSession, files: Express.Multer.File[]) {
        return this.uploadsService.uploadImages(
            session,
            files,
            SupportedFileCollections.PROFILE_PICTURE,
        );
    }
}
