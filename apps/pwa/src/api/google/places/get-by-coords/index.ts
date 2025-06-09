import { fetcherClient } from "@/api/fetcher-client";
import {
    GoogleGeocodeRequestParams,
    GooglePlacesApiRequestBody,
    GooglePlacesApiResponse,
    GooglePlacesApiRestrictionCircle,
} from "../types";

export namespace GetPlaceByCoordinates {
    export type TInput = GooglePlacesApiRequestBody & {
        locationRestriction?: GooglePlacesApiRestrictionCircle
    };

    export type TParams = Partial<GoogleGeocodeRequestParams>;

    export type TOutput = GooglePlacesApiResponse;

    export const queryKey = ["google/places"];
}

export const getPlaceByCoordinates = fetcherClient<GetPlaceByCoordinates.TInput, GetPlaceByCoordinates.TOutput, GetPlaceByCoordinates.TParams>({
    fetcherFunc: (fetcher, { body, ...input }) => {
        if(input.params) {
            input.params.key = "AIzaSyAIfGyOk4VSltw4QnBr1r6wjK_2bkw1pU4";
        }

        return fetcher.get("/geocode/json", {
            baseURL: "https://maps.googleapis.com/maps/api",
            ...input,
        });
    },
});