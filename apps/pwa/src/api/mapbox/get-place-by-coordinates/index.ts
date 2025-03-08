import { fetcherClient } from "@/api/fetcher-client";
import { MapboxFeatureResponse, MapboxRequestParams } from "../types";

export namespace GetPlaceByCoordinates {
    export type TParams = Partial<MapboxRequestParams>;
    export type TInput = {
        lng: number;
        lat: number;
    };
    export type TOutput = {
        features: MapboxFeatureResponse[]
    };
}

export const getPlaceByCoordinates = fetcherClient<GetPlaceByCoordinates.TInput, GetPlaceByCoordinates.TOutput, GetPlaceByCoordinates.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get(`/${input?.body?.lng},${input?.body?.lat}.json`, {
            baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
            credentials: "omit",
            params: input?.params,
        });
    },
});