import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterestsService } from "./interests.service";
import { InterestsController } from "./interests.controller";
import { InterestRelationsEntity } from "./entities/interest-relations.entity";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { InterestsRepository } from "./repositories/interests.repository";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";

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
        ProfileRepository,
    ],
})
export class InterestsModule {}
