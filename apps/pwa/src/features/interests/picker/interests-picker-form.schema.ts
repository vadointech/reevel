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

export const formInterestsFieldSchema = z.object({
    interests: z.array(formInterestsEntitySchema),
});

export type FormInterestsFieldSchema = z.infer<typeof formInterestsFieldSchema>;