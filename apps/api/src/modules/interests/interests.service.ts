import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InterestsEntity } from "./entities/interests.entity";
import { In, Repository } from "typeorm";
import { InterestRelationsEntity } from "@/modules/interests/entities/interest-relations.entity";

@Injectable()
export class InterestsService {

    constructor(
        @InjectRepository(InterestsEntity)
        private readonly interestsRepository: Repository<InterestsEntity>,
        @InjectRepository(InterestRelationsEntity)
        private readonly interestsRelationsRepository: Repository<InterestRelationsEntity>,
    ) {}

    async getInitialInterests(): Promise<InterestsEntity[]> {
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
        ];

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
        });

        return relatedInterests.map(item => item.sourceInterest);
    }
}
