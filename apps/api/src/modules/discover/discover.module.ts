import { Module } from "@nestjs/common";
import { DiscoverService } from "./discover.service";
import { DiscoverController } from "./discover.controller";
import { EventRepository } from "@/modules/event/repositories";
import { CitiesRepository } from "@/modules/cities/repositories";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";
import { InterestsRepository } from "@/modules/interests/repositories/interests.repository";

@Module({
    controllers: [DiscoverController],
    providers: [
        DiscoverService,

        EventRepository,
        CitiesRepository,
        ProfileRepository,
        InterestsRepository,
    ],
})
export class DiscoverModule {}
