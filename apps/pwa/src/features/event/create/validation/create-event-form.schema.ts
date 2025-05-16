import { z } from "zod";

export const createEventFormSchema = z.object({
    title: z.string().min(1).or(z.null()),
    description: z.string().min(1).or(z.null()),
    interests: z.array(z.number()).or(z.null()),
    ticketsCount: z.number().or(z.null()),
    ticketPrice: z.number().or(z.null()),
    startDate: z.date(),
    startTime: z.date().or(z.null()),
    endTime: z.date().or(z.null()),
});
export type CreateEventFormSchemaValues = z.infer<typeof createEventFormSchema>;