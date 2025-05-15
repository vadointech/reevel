import { z } from "zod";

export const createEventFormSchema = z.object({
    title: z.string().min(1).or(z.undefined()),
    description: z.string().min(1).or(z.undefined()),
    interests: z.array(z.number()).or(z.undefined()),
    ticketsCount: z.string().or(z.undefined()),
    ticketPrice: z.string().or(z.undefined()),
    startDate: z.date(),
    startTime: z.date().or(z.undefined()),
    endTime: z.date().or(z.undefined()),
});
export type CreateEventFormSchemaValues = z.infer<typeof createEventFormSchema>;