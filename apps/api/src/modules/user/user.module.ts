import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./user.service";
import { ProfileInterestsRepository } from "@/modules/profile/repositories/profile-interests.repository";
import { UploadsRepository } from "@/modules/uploads/repositories/uploads.repository";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { EventHostsRepository } from "@/modules/event/repositories/event-hosts.repository";

@Module({
    controllers: [UserController],
    providers: [
        UserRepository,
        UserService,

        ProfileRepository,
        ProfileInterestsRepository,
        UploadsRepository,
        EventHostsRepository,
    ],
})
export class UserModule { }
