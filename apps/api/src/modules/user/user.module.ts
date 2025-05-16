import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { SubscriptionRepository } from "@/modules/subscription/subscription.repository";
import { ProfileRepository } from "@/modules/profile/profile.repository";

@Module({
    controllers: [UserController],
    providers: [
        UserRepository,
        UserService,

        ProfileRepository,
        SubscriptionRepository,
    ],
})
export class UserModule {}
