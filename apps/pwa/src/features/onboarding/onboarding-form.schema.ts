import { z } from "zod";
import { formInterestsEntitySchema } from "@/features/interests/picker";
import { placeLocationEntity } from "@/entities/place";

export const onboardingFormSchema = z.object({
    picture: z.string(),
    fullName: z.string(),
    bio: z.string(),
    interests: z.array(formInterestsEntitySchema),
    location: placeLocationEntity.optional(),
});

export type OnboardingFormSchemaValues = z.infer<typeof onboardingFormSchema>;