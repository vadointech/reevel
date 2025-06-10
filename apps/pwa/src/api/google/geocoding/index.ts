import { fetcherClient } from "@/api/fetcher-client";
import { GoogleGeocodingApiRequestParameters, GoogleGeocodingApiResponse } from "./types";

export namespace GetPlaceByCoordinates {
    export type TInput = never;

    export type TParams = Partial<GoogleGeocodingApiRequestParameters>;

    export type TOutput = GoogleGeocodingApiResponse;

    export const queryKey = ["google/places"];
}

export const getPlaceByCoordinates = fetcherClient<GetPlaceByCoordinates.TInput, GetPlaceByCoordinates.TOutput, GetPlaceByCoordinates.TParams>({
    fetcherFunc: (fetcher, { body, ...input }) => {
        if(input.params) {
            input.params.key = "AIzaSyAIfGyOk4VSltw4QnBr1r6wjK_2bkw1pU4";
        }

        return fetcher.get("/geocode/json", {
            baseURL: "https://maps.googleapis.com/maps/api",
            credentials: "omit",
            ...input,
        });
    },
});