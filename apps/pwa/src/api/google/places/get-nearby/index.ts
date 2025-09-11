import { fetcherClient } from "@/api/fetcher-client";
import {
    GooglePlacesApiRequestBody,
    GooglePlacesApiRequestParams,
    GooglePlacesApiResponse, GooglePlacesApiRestrictionCircle,
} from "../types";
import { getGooglePlacesApiFieldMask } from "@/api/google/places/_internal/field-mask";
import { FetcherResponse } from "@/lib/fetcher/types";

export namespace GetNearbyPlaces {
    export type TInput = GooglePlacesApiRequestBody & {
        locationRestriction?: GooglePlacesApiRestrictionCircle
    };

    export type TParams = Partial<GooglePlacesApiRequestParams>;

    export type TOutput = GooglePlacesApiResponse;

    export const queryKey = ["google/places"];
}

export const getNearbyPlaces = fetcherClient.fetch<GetNearbyPlaces.TInput, GetNearbyPlaces.TOutput, GetNearbyPlaces.TParams>({
    fetcherFunc: async(fetcher, input) => {

        const { fieldMask, body } = getGooglePlacesApiFieldMask(input?.body);

        const result: FetcherResponse<GetNearbyPlaces.TOutput> = await fetcher.post(":searchNearby", {
            baseURL: "https://places.googleapis.com/v1/places",
            credentials: "omit",
            headers: {
                "X-Goog-Api-Key": "AIzaSyAIfGyOk4VSltw4QnBr1r6wjK_2bkw1pU4",
                "X-Goog-FieldMask": fieldMask,
            },
            body,
            ...input,
        });

        if(result.data) {
            if(!result.data.places) {
                result.data.places = [];
                return result;
            }
        }
        return result;
    },
});