import { z } from "zod";

export const placeLocationEntity = z.object({
    id: z.string(),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
    }),
    displayName: z.string(),
    primaryType: z.string(),
    primaryTypeDisplayName: z.string(),
    formattedAddress: z.string(),
    googleMapsUri: z.string(),
    bbox: z.tuple([
        z.number(),
        z.number(),
        z.number(),
        z.number(),
    ]).optional(),
});

export type PlaceLocationEntity = z.infer<typeof placeLocationEntity>;