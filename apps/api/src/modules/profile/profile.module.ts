import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { ProfileLocationRepository } from "@/modules/profile/repositories/profile-location.repository";
import { UploadsModule } from "@/modules/uploads/uploads.module";

@Module({
    imports: [
        UploadsModule,
    ],
    controllers: [ProfileController],
    providers: [
        ProfileService,
        ProfileRepository,
        ProfileLocationRepository,
    ],
    exports: [ProfileService],
})
export class ProfileModule { }
