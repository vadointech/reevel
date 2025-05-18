import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterestsService } from "./interests.service";
import { InterestsController } from "./interests.controller";
import { InterestRelationsEntity } from "./entities/interest-relations.entity";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { InterestsRepository } from "./repositories/interests.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProfileEntity,
            InterestRelationsEntity,
        ]),
    ],
    controllers: [InterestsController],
    providers: [
        InterestsService,

        InterestsRepository,
    ],
})
export class InterestsModule {}
