import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterestsService } from "./interests.service";
import { InterestsController } from "./interests.controller";
import { InterestsEntity } from "./entities/interests.entity";
import { InterestRelationsEntity } from "./entities/interest-relations.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            InterestsEntity,
            InterestRelationsEntity,
        ]),
    ],
    controllers: [InterestsController],
    providers: [InterestsService],
})
export class InterestsModule {}
