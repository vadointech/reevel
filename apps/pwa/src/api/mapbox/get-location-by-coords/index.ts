import { fetcherClient } from "@/api/fetcher-client";
import { MapboxFeaturesResponse, MapboxRequestParams } from "@/api/mapbox/types";

export namespace GetLocationByCoordinates {
    export type TInput = null;
    export type TOutput = MapboxFeaturesResponse;
    export type TParams = MapboxRequestParams & {
        longitude: number;
        latitude: number;
    };
    export const queryKey = ["mapbox/places"];
}

export const getLocationByCoordinates = fetcherClient.fetch<GetLocationByCoordinates.TInput, GetLocationByCoordinates.TOutput, GetLocationByCoordinates.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/reverse", {
            baseURL: "https://api.mapbox.com/search/geocode/v6",
            credentials: "omit",
            ...input,
        });
    },
});