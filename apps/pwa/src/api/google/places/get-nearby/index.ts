import { fetcherClient } from "@/api/fetcher-client";
import {
    GooglePlacesApiRequestBody,
    GooglePlacesApiRequestParams,
    GooglePlacesApiResponse, GooglePlacesApiRestrictionCircle,
} from "../types";
import { FetcherResponse } from "@/lib/fetcher/types";

export namespace GetNearbyPlaces {
    export type TInput = GooglePlacesApiRequestBody & {
        locationRestriction?: GooglePlacesApiRestrictionCircle
    };

    export type TParams = Partial<GooglePlacesApiRequestParams>;

    export type TOutput = GooglePlacesApiResponse;

    export const queryKey = ["places/nearby"];
}

export const getNearbyPlaces = fetcherClient<GetNearbyPlaces.TInput, GetNearbyPlaces.TOutput, GetNearbyPlaces.TParams>({
    fetcherFunc: async(fetcher, input) => {
        let fieldMask = "places.id,places.displayName,place.location";

        if(input?.params?.fieldMask) {
            if(typeof input.params.fieldMask === "string") {
                fieldMask = input.params.fieldMask;
            } else {
                fieldMask = input.params.fieldMask.map(mask => `places.${mask}`).join(",");
            }
        }
        
        const result: FetcherResponse<GetNearbyPlaces.TOutput> = await fetcher.post(":searchNearby", {
            baseURL: "https://places.googleapis.com/v1/places",
            credentials: "omit",
            headers: {
                "X-Goog-Api-Key": "AIzaSyAIfGyOk4VSltw4QnBr1r6wjK_2bkw1pU4",
                "X-Goog-FieldMask": fieldMask,
            },
            body: input?.body,
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