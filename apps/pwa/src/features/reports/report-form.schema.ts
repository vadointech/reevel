import { z } from "zod";

export const reportFormSchema = z.object({
    type: z.string(),
    entityId: z.string(),
    description: z.string().optional(),
});
export type ReportFromSchemaValues = z.infer<typeof reportFormSchema>;