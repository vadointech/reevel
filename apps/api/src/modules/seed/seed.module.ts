import { Module } from "@nestjs/common";
import { SeedController } from "./seed.controller";
import { InterestsSeedService } from "./services/interests.seed.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";
import { InterestCategoriesEntity } from "@/modules/interests/entities/interest-category.entity";
import { InterestRelationsEntity } from "@/modules/interests/entities/interest-relations.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            // Interests
            InterestsEntity,
            InterestCategoriesEntity,
            InterestRelationsEntity,
        ]),
    ],
    controllers: [SeedController],
    providers: [
        InterestsSeedService,
    ],
})
export class SeedModule {}
