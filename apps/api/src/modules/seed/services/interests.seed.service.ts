import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InterestRelationsEntity } from "@/modules/interests/entities/interest-relations.entity";
import { Repository } from "typeorm";
import { InterestCategoriesEntity } from "@/modules/interests/entities/interest-category.entity";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";
import data from "../data/interests.json";
import slugify from "slugify";

@Injectable()
export class InterestsSeedService {
    constructor(
        @InjectRepository(InterestRelationsEntity)
        private readonly interestRelationsRepository: Repository<InterestRelationsEntity>,
        @InjectRepository(InterestCategoriesEntity)
        private readonly interestCategoriesRepository: Repository<InterestCategoriesEntity>,
        @InjectRepository(InterestsEntity)
        private readonly interestsEntity: Repository<InterestsEntity>,
    ) {}

    async seedInterests() {
        for(const category of data) {
            const newCategory = this.interestCategoriesRepository.create({
                name_en: category.name_en,
                name_uk: category.name_ua,
            });

            const dbCategory = await this.interestCategoriesRepository.save(newCategory);

            const categoryInterests = category.interests.map((interest) => {
                const slug = this.createSlug(interest.name_en);

                return this.interestsEntity.create({
                    slug,
                    title_en: interest.name_en,
                    title_uk: interest.name_ua,
                    icon: interest.icon,
                    primaryColor: interest.primaryColor,
                    secondaryColor: interest.secondaryColor,
                    categoryId: dbCategory.id,
                });
            });

            await this.interestsEntity.save(categoryInterests);
        }
    }

    async seedRelations() {
        for (const category of data) {
            for (const interest of category.interests) {
                const sourceSlug = this.createSlug(interest.name_en);
                const relationSlugs = interest.related_to.map((rel) => this.createSlug(rel));

                for (const relationSlug of relationSlugs) {
                    try {
                        const newRelation = this.interestRelationsRepository.create({
                            sourceInterestSlug: sourceSlug,
                            relatedInterestSlug: relationSlug,
                        });
                        await this.interestRelationsRepository.save(newRelation); // Додаємо await
                    } catch (error) {
                        console.log(`Пропущено зв’язок: ${sourceSlug} -> ${relationSlug}. Помилка: ${error.message}`);
                        continue;
                    }
                }
            }
        }
    }

    async getRelated(slug: string) {
        return this.interestRelationsRepository.find({
            where: {
                relatedInterestSlug: slug,
            },
            select: {
                sourceInterestSlug: true,
            },
        });
    }

    private createSlug(text: string) {
        return slugify(text, {
            replacement: "-",
            remove: undefined,
            lower: true,
            locale: "en",
            trim: true,
        });
    }
}