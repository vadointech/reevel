import { Injectable } from "@nestjs/common";
import data from "../data/interests.json";
import slugify from "slugify";
import { InterestsRelationsRepository } from "@/modules/interests/repositories/interests-relations.repository";
import { InterestsCategoriesRepository } from "@/modules/interests/repositories/interests-categories.repository";
import { InterestsRepository } from "@/modules/interests/repositories/interests.repository";
import { InterestCategoriesEntity } from "@/modules/interests/entities/interest-category.entity";
import { InterestRelationsEntity } from "@/modules/interests/entities/interest-relations.entity";

@Injectable()
export class InterestsSeedService {
    constructor(
        private readonly interestsRepository: InterestsRepository,
        private readonly interestRelationsRepository: InterestsRelationsRepository,
        private readonly interestCategoriesRepository: InterestsCategoriesRepository,
    ) {}

    async seedInterests() {
        const categoriesToCreate: InterestCategoriesEntity[] = data.map(category =>
            this.interestCategoriesRepository.create({
                name_en: category.name_en,
                name_uk: category.name_ua,
            }),
        );
        const savedCategories = await this.interestCategoriesRepository.createAndSaveMany(categoriesToCreate);
        console.log(`✅ Збережено ${savedCategories.length} категорій.`);

        const categoryMap = new Map<string, string>();
        savedCategories.forEach(c => categoryMap.set(c.name_en, c.id));

        const interestsToCreate = data.flatMap(category => {
            const categoryId = categoryMap.get(category.name_en);
            if (!categoryId) return [];

            return category.interests.map(interest => {
                const slug = this.createSlug(interest.name_en);
                return this.interestsRepository.create({
                    slug,
                    title_en: interest.name_en,
                    title_uk: interest.name_ua,
                    icon: interest.icon,
                    primaryColor: interest.primaryColor,
                    secondaryColor: interest.secondaryColor,
                    categoryId: categoryId,
                });
            });
        });

        await this.interestsRepository.saveMany(interestsToCreate, undefined, { chunk: 200 });
        console.log(`✅ Збережено ${interestsToCreate.length} інтересів.`);
    }

    async seedRelations() {
        const allInterests = await this.interestsRepository.findMany({ select: ["slug"] });
        const existingSlugs = new Set(allInterests.map(i => i.slug));
        console.log(`Знайдено ${existingSlugs.size} унікальних slug'ів у базі даних для валідації.`);

        const relationsToCreate: InterestRelationsEntity[] = [];
        const badRelations: { source: string; related: string }[] = [];

        for(const category of data) {
            for(const interest of category.interests) {
                if (!interest.related_to || interest.related_to.length === 0) continue;

                const sourceSlug = this.createSlug(interest.name_en);
                const relationSlugs = interest.related_to.map(rel => this.createSlug(rel));

                for(const relationSlug of relationSlugs) {
                    if(existingSlugs.has(sourceSlug) && existingSlugs.has(relationSlug)) {
                        relationsToCreate.push(
                            this.interestRelationsRepository.create({
                                sourceInterestSlug: sourceSlug,
                                relatedInterestSlug: relationSlug,
                            }),
                        );
                    } else {
                        badRelations.push({ source: sourceSlug, related: relationSlug });
                    }
                }
            }
        }

        if(badRelations.length > 0) {
            console.error(`❌ Знайдено ${badRelations.length} невалідних зв’язків. Вони не будуть збережені.`);
            badRelations.forEach(({ source, related }) => {
                const sourceExists = existingSlugs.has(source);
                const relatedExists = existingSlugs.has(related);
                if(!sourceExists) console.error(`   - Slug '${source}' не існує.`);
                if(!relatedExists) console.error(`   - Slug '${related}' (зі списку related_to для '${source}') не існує.`);
            });
            console.log("Будь ласка, виправте ці помилки у ваших вихідних даних.");
        }

        if(relationsToCreate.length === 0) {
            console.log("Немає валідних зв’язків для створення.");
            return;
        }

        try {
            await this.interestRelationsRepository.saveMany(relationsToCreate, undefined, { chunk: 500 });
            console.log(`✅ Успішно збережено ${relationsToCreate.length} валідних зв’язків.`);
        } catch (error) {
            console.error(`Помилка під час масового збереження зв’язків: ${error.message}`);
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