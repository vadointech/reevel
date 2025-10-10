import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UpdateProfileDto } from "@/modules/profile/dto/update-profile.dto";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { ServerSession } from "@/types";
import { SupportedFileCollections } from "@/modules/uploads/entities/uploads.entity";
import { UploadsService } from "@/modules/uploads/uploads.service";
import { ProfileInterestsRepository } from "@/modules/profile/repositories/profile-interests.repository";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { CitiesRepository } from "@/modules/cities/repositories";
import { BoundingBox, LngLat } from "@repo/geo";

@Injectable()
export class ProfileService {
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly profileInterestsRepository: ProfileInterestsRepository,
        private readonly citiesRepository: CitiesRepository,
        private readonly uploadsService: UploadsService,

        private dataSource: DataSource,
    ) { }

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
            interests,
            locationId,
            locationName,
            locationBbox,
            ...newData
        } = input;

        return this.dataSource.transaction(async(entityManager) => {

            for (const [key, value] of Object.entries(newData)) {
                if (value !== undefined) {
                    dbProfile[key] = value;
                }
            }

            if(locationId && locationName && locationBbox) {
                const dbCity = await this.citiesRepository.findOneBy({ mapboxId: locationId });

                if(dbCity) {
                    dbProfile.locationId = dbCity.id;
                } else {
                    const [swLng, swLat, neLng, neLat] = locationBbox;
                    const bbox = new BoundingBox(
                        new LngLat(swLng, swLat),
                        new LngLat(neLng, neLat),
                    );
                    const center = bbox.getCenter();

                    const city =  await this.citiesRepository.createAndSave({
                        name: locationName,
                        mapboxId: locationId,
                        center: {
                            type: "Point",
                            coordinates: [center.lng, center.lat],
                        },
                        bbox: {
                            type: "Polygon",
                            coordinates: [[
                                [swLng, swLat], // SW corner
                                [swLng, neLat], // NW corner
                                [neLng, neLat], // NE corner
                                [neLng, swLat], // SE corner
                                [swLng, swLat], // Back to SW to close polygon
                            ]],
                        },
                    }, entityManager);

                    dbProfile.locationId = city.id;
                }
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
