import { MapboxFeaturesResponse, MapboxRequestParams } from "../types";
import { fetcherClient } from "@/api/client";

export namespace GetPlaceByName {
    export type TInput = null;
    export type TOutput = MapboxFeaturesResponse;
    export type TParams = MapboxRequestParams & {
        q: string;
    };
    export const queryKey = ["mapbox/places"];
}

export const getPlaceByName = fetcherClient.fetch<GetPlaceByName.TInput, GetPlaceByName.TOutput, GetPlaceByName.TParams>({
    fetcherFunc: async(fetcher, input) => {
        return fetcher.get("/forward", {
            baseURL: "https://api.mapbox.com/search/geocode/v6",
            credentials: "omit",
            ...input,
        });
    },
});