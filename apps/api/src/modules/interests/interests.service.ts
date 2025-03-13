import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InterestsEntity } from "./entities/interests.entity";
import { In, Repository } from "typeorm";
import { InterestRelationsEntity } from "@/modules/interests/entities/interest-relations.entity";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";

@Injectable()
export class InterestsService {

    constructor(
        @InjectRepository(InterestsEntity)
        private readonly interestsRepository: Repository<InterestsEntity>,
        @InjectRepository(InterestRelationsEntity)
        private readonly interestsRelationsRepository: Repository<InterestRelationsEntity>,
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
    ) {}

    async getInitialInterests(userId: string): Promise<InterestsEntity[]> {
        const slugs = [
            "reading",
            "cooking",
            "fitness-training",
            "photography",
            "traveling",
            "video-gaming",
            "music-listening",
            "hiking",
            "gardening",
            "drawing",
            "socializing",
            "diy-projects",
            "movie-watching",
            "running",
            "pet-care",
            "shopping",
        ];

        const userProfile = await this.profileRepository.findOne({
            where: { userId },
            relations: {
                interests: true,
            },
        });

        if(userProfile) {
            const userInterests = userProfile.interests.map(item => item.interestId);
            slugs.push(...userInterests);
        }

        return this.interestsRepository.find({
            where: {
                slug: In(slugs),
            },
        });
    }

    async getRelatedInterests(slug: string): Promise<InterestsEntity[]> {
        const relatedInterests = await this.interestsRelationsRepository.find({
            where: {
                relatedInterestSlug: slug,
            },
            relations: {
                sourceInterest: {},
            },
            take: 6,
        });

        return relatedInterests.map(item => item.sourceInterest);
    }
}
