import { z } from "zod";

export const formInterestsEntitySchema = z.object({
    slug: z.string(),
    title_en: z.string(),
    title_uk: z.string(),
    icon: z.string(),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    categoryId: z.string(),
});