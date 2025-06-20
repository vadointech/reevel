import { Module } from "@nestjs/common";
import { SeedController } from "./seed.controller";
import { InterestsSeedService } from "./services/interests.seed.service";
import { InterestsRepository } from "@/modules/interests/repositories/interests.repository";
import { InterestsRelationsRepository } from "@/modules/interests/repositories/interests-relations.repository";
import { InterestsCategoriesRepository } from "@/modules/interests/repositories/interests-categories.repository";

@Module({
    controllers: [SeedController],
    providers: [
        InterestsSeedService,

        InterestsRepository,
        InterestsRelationsRepository,
        InterestsCategoriesRepository,
    ],
})
export class SeedModule {}
