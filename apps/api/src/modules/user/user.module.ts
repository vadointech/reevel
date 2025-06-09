import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { ProfileInterestsRepository } from "@/modules/profile/repositories/profile-interests.repository";
import { UploadsRepository } from "@/modules/uploads/repositories/uploads.repository";

@Module({
    controllers: [UserController],
    providers: [
        UserRepository,
        UserService,

        ProfileInterestsRepository,
        UploadsRepository,
    ],
})
export class UserModule {}
