import { z } from "zod";

export const point = z.object({
    id: z.string(),
    type: z.literal("Feature"),
    geometry: z.object({
        type: z.literal("Point"),
        coordinates: z.array(z.number()),
    }),
});

export const basePoint = z.object({
    id: z.string(),
    label: z.string(),
});

export const iconPoint = () => {
    return point.and(z.object({
        properties: basePoint.and(z.object({
            iconType: z.string().or(z.undefined()),
            address: z.string().or(z.undefined()),
        })),
    }));
};