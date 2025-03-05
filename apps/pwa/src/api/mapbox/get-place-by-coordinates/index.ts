"use server";

import { serverFetcher } from "@/api/server";
import { headers } from "next/headers";

export namespace GetPlaceByCoordinates {
    export type TParams = Partial<{
        types: string;
        access_token: string;
    }>;
    export type TInput = {
        lng: number;
        lat: number;
    };
    export type TOutput = {
        features: Array<{
            id: string;
            place_name: string;
            place_type: string;
            properties: {
                mapbox_id: string;
                wikidata: string;
            };
            relevance: number;
            text: string;
            type: string;
            bbox: [number, number, number, number];
            center: [number, number];
            context: Array<{
                id: string;
                mapbox_id: string;
                short_code: string;
                text: string;
                wikidata: string;
            }>;
            geometry: {
                type: "Point",
                coordinates: [number, number];
            }
        }>
    };
}

export async function getPlaceByCoordinates(input: GetPlaceByCoordinates.TInput, params?: GetPlaceByCoordinates.TParams) {
    return serverFetcher(await headers()).get<null, GetPlaceByCoordinates.TOutput, GetPlaceByCoordinates.TParams>(`/${input.lng},${input.lat}.json`, {
        baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
        credentials: "omit",
        params: {
            access_token: process.env.MAPBOX_ACESS_TOKEN,
            ...params,
        },
    });
}