import { Module } from "@nestjs/common";
import { SeedController } from "./seed.controller";
import { InterestsSeedService } from "./services/interests.seed.service";
import { InterestsRepository } from "@/modules/interests/repositories/interests.repository";
import { InterestsRelationsRepository } from "@/modules/interests/repositories/interests-relations.repository";
import { InterestsCategoriesRepository } from "@/modules/interests/repositories/interests-categories.repository";
import { EventSeedService } from "@/modules/seed/services/event.seed.service";
import { EventRepository } from "@/modules/event/repositories/event.repository";
import { EventInterestsRepository } from "../event/repositories/event-interests.repository";

@Module({
    controllers: [SeedController],
    providers: [
        InterestsSeedService,
        EventSeedService,

        InterestsRepository,
        EventInterestsRepository,
        InterestsRelationsRepository,
        InterestsCategoriesRepository,
        EventRepository,
    ],
})
export class SeedModule { }
