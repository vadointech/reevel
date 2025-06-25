import { z } from "zod";
import { formInterestsEntitySchema } from "@/features/interests/picker/interests-picker-form.schema";
import { iconPoint } from "@/lib/zod/validators";

export const createEventFormSchema = z.object({
    visibility: z.enum(["PUBLIC", "PRIVATE", "HOST"]),
    title: z.string().min(1),
    description: z.string().min(1),
    poster: z.object({
        id: z.string(),
        fileUrl: z.string(),
    }),
    primaryColor: z.string().or(z.undefined()),
    interests: z.array(formInterestsEntitySchema).min(1, "Expected at least one interest"),
    location: iconPoint(),
    ticketsAvailable: z.string().or(z.undefined())
        .transform(value => {
            if(value?.length === 0) return undefined;
            return value;
        }),
    ticketPrice: z.string().or(z.undefined())
        .transform(value => {
            if(value?.length === 0) return undefined;
            return value;
        }),
    startDate: z.date(),
    startTime: z.date().or(z.undefined()),
    endDate: z.date().or(z.undefined()),
    endTime: z.date().or(z.undefined()),
});
export type CreateEventFormSchemaValues = z.infer<typeof createEventFormSchema>;