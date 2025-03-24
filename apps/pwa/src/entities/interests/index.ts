export type InterestEntity = {
    slug: string;
    title_en: string;
    title_uk: string;
    icon: string;
    primaryColor: string;
    secondaryColor: string;
    categoryId: string;
};


export type UserInterests = {
    userInterests: InterestEntity[]
}