import { Injectable } from "@nestjs/common";
import data from "../data/interests.json";
import slugify from "slugify";
import { InterestsRelationsRepository } from "@/modules/interests/repositories/interests-relations.repository";
import { InterestsCategoriesRepository } from "@/modules/interests/repositories/interests-categories.repository";
import { InterestsRepository } from "@/modules/interests/repositories/interests.repository";

@Injectable()
export class InterestsSeedService {
    constructor(
        private readonly interestsRepository: InterestsRepository,
        private readonly interestRelationsRepository: InterestsRelationsRepository,
        private readonly interestCategoriesRepository: InterestsCategoriesRepository,
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

                return this.interestsRepository.create({
                    slug,
                    title_en: interest.name_en,
                    title_uk: interest.name_ua,
                    icon: interest.icon,
                    primaryColor: interest.primaryColor,
                    secondaryColor: interest.secondaryColor,
                    categoryId: dbCategory.id,
                });
            });

            await this.interestsRepository.saveMany(categoryInterests);
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
                        await this.interestRelationsRepository.save(newRelation);
                    } catch (error) {
                        console.log(`Пропущено зв’язок: ${sourceSlug} -> ${relationSlug}. Помилка: ${error.message}`);
                        continue;
                    }
                }
            }
        }
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