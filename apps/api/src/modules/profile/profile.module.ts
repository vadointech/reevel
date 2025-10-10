import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { UploadsModule } from "@/modules/uploads/uploads.module";
import { ProfileInterestsRepository } from "@/modules/profile/repositories/profile-interests.repository";
import { CitiesRepository } from "@/modules/cities/repositories";

@Module({
    imports: [
        UploadsModule,
    ],
    controllers: [ProfileController],
    providers: [
        ProfileService,
        ProfileRepository,
        ProfileInterestsRepository,
        CitiesRepository,
    ],
    exports: [ProfileService],
})
export class ProfileModule { }
