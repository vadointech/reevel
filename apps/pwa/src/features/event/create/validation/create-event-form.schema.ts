import { z } from "zod";
import { formInterestsEntityShema } from "@/features/interests/picker/form-field.schema";

export const createEventFormSchema = z.object({
    title: z.string().min(1).or(z.undefined()),
    description: z.string().min(1).or(z.undefined()),
    interests: z.array(formInterestsEntityShema).min(1, "Expected at least one interest"),
    location: z.object({
        title: z.string().min(1).or(z.undefined()),
        coordinates: z.array(z.number()).min(2).or(z.undefined()),
    }),
    ticketsCount: z.string().or(z.undefined()),
    ticketPrice: z.string().or(z.undefined()),
    startDate: z.date(),
    endDate: z.date().or(z.undefined()),
    startTime: z.date().or(z.undefined()),
    endTime: z.date().or(z.undefined()),
});
export type CreateEventFormSchemaValues = z.infer<typeof createEventFormSchema>;