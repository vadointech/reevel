import { fetcherClient } from "@/api/fetcher-client";

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

export const getPlaceByCoordinates = fetcherClient<GetPlaceByCoordinates.TInput, GetPlaceByCoordinates.TOutput, GetPlaceByCoordinates.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get<null, GetPlaceByCoordinates.TOutput, GetPlaceByCoordinates.TParams>(`/${input?.body?.lng},${input?.body?.lat}.json`, {
            baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
            credentials: "omit",
            params: {
                access_token: process.env.MAPBOX_ACESS_TOKEN,
                ...input?.params,
            },
        });
    },
});