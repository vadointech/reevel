import { MapboxFeatureResponse, MapboxRequestParams } from "@/api/mapbox/types";
import { fetcherClient } from "@/api/fetcher-client";

export namespace GetPlaceByName {
    export type TParams = Partial<MapboxRequestParams>;
    export type TInput = {
        name: string;
    };
    export type TOutput = {
        features: MapboxFeatureResponse[];
    };
}

export const getPlaceByName = fetcherClient<GetPlaceByName.TInput, GetPlaceByName.TOutput, GetPlaceByName.TParams>({
    fetcherFunc: async(fetcher, input) => {
        return fetcher.get(`/${input?.body?.name}.json`, {
            baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
            credentials: "omit",
            params: input?.params,
        });
    },
});