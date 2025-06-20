import { Module } from "@nestjs/common";
import { InterestsService } from "./interests.service";
import { InterestsController } from "./interests.controller";
import { InterestsRepository } from "./repositories/interests.repository";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { InterestsRelationsRepository } from "@/modules/interests/repositories/interests-relations.repository";

@Module({
    controllers: [InterestsController],
    providers: [
        InterestsService,

        InterestsRepository,
        InterestsRelationsRepository,
        ProfileRepository,
    ],
})
export class InterestsModule {}
