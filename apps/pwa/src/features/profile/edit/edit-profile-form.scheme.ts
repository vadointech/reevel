import { z } from "zod";
import { formInterestsEntitySchema } from "@/features/interests/picker";
import { placeLocationEntity } from "@/entities/place";

export const editProfileFormSchema = z.object({
    avatar: z.string(),
    background: z.string(),
    fullName: z.string(),
    bio: z.string(),
    interests: z.array(formInterestsEntitySchema),
    location: placeLocationEntity.optional(),
});

export type EditProfileFormSchemaValues = z.infer<typeof editProfileFormSchema>;