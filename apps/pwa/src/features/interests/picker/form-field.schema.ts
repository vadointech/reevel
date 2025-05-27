import { z } from "zod";

export const formInterestsEntityShema = z.object({
    slug: z.string(),
    title_en: z.string(),
    title_uk: z.string(),
    icon: z.string(),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    categoryId: z.string(),
});

export const formInterestsFieldShema = z.object({
    interests: z.array(formInterestsEntityShema),
});

export type FormInterestsFieldSchema = z.infer<typeof formInterestsFieldShema>;