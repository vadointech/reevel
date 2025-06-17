import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InterestsEntity } from "./entities/interests.entity";
import { In, Repository } from "typeorm";
import { InterestRelationsEntity } from "@/modules/interests/entities/interest-relations.entity";
import { InterestsRepository } from "./repositories/interests.repository";
import { InterestsFilterParamsDto } from "@/modules/interests/dto/interests-filter-params.dto";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";

@Injectable()
export class InterestsService {

    constructor(
        private readonly interestsRepository: InterestsRepository,
        @InjectRepository(InterestRelationsEntity)
        private readonly interestsRelationsRepository: Repository<InterestRelationsEntity>,
        private readonly profileRepository: ProfileRepository,
    ) { }

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
            "shopping",
        ];

        return this.interestsRepository.findManyBy({ slug: In(slugs) });
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

    async getInterestsByParams(params: InterestsFilterParamsDto) {
        const queryBuilder = await this.interestsRepository
            .queryBuilder("interests");

        Object.entries(params).forEach(([key, value]: [keyof InterestsFilterParamsDto, any]) => {
            switch(key) {
                case "title_en":
                    queryBuilder.where("interests.title_en ILIKE :title", { title: `%${value}%` });
                    break;
                case "title_uk":
                    queryBuilder.where("interests.title_uk ILIKE :title", { title: `%${value}%` });
                    break;
            }
        });

        return queryBuilder.getMany();
    }
}
