import { z } from "zod";
import { formInterestsEntityShema } from "@/features/interests/picker/form-field.schema";
import { iconPoint } from "@/lib/zod/validators";

export const createEventFormSchema = z.object({
    type: z.literal("public").or(z.literal("private")),
    host: z.string().or(z.undefined()),
    title: z.string().min(1).or(z.undefined()),
    description: z.string().min(1).or(z.undefined()),
    interests: z.array(formInterestsEntityShema).min(1, "Expected at least one interest"),
    location: iconPoint(),
    ticketsCount: z.string().or(z.undefined()),
    ticketPrice: z.string().or(z.undefined()),
    startDate: z.date(),
    endDate: z.date().or(z.undefined()),
    startTime: z.date().or(z.undefined()),
    endTime: z.date().or(z.undefined()),
});
export type CreateEventFormSchemaValues = z.infer<typeof createEventFormSchema>;