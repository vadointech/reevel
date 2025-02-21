import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity } from "./entities/profile.entity";
import { ProfileInterestsEntity } from "./entities/profile-interests.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfileEntity, ProfileInterestsEntity]),
    ],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService],
})
export class ProfileModule {}
