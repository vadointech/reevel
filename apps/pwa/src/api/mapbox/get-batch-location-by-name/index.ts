import { MapboxBatchFeaturesResponse, MapboxRequestParams } from "../types";
import { fetcherClient } from "@/api/fetcher-client";

export namespace GetBatchPlaceByName {
    export type TInput = Array<Omit<MapboxRequestParams, "access_token"> & {
        q: string;
    }>;
    export type TParams = Pick<MapboxRequestParams, "access_token">;
    export type TOutput = MapboxBatchFeaturesResponse;
    export const queryKey = ["mapbox/places"];
}

export const getBatchPlaceByName = fetcherClient.fetch<GetBatchPlaceByName.TInput, GetBatchPlaceByName.TOutput, GetBatchPlaceByName.TParams>({
    fetcherFunc: async(fetcher, input) => {
        return fetcher.post("/batch", {
            baseURL: "https://api.mapbox.com/search/geocode/v6", // TODO: Replace with own proxy
            credentials: "omit",
            ...input,
        });
    },
});