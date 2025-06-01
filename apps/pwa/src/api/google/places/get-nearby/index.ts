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
        let fieldMask = "places.id,places.displayName,places.location";
        const params = input?.params;
        delete input?.params;

        if(params?.fieldMask) {
            if(typeof params.fieldMask === "string") {
                fieldMask = params.fieldMask;
            } else {
                fieldMask = params.fieldMask.map(mask => `places.${mask}`).join(",");
            }
        }
        
        const result: FetcherResponse<GetNearbyPlaces.TOutput> = await fetcher.post(":searchNearby", {
            baseURL: "https://places.googleapis.com/v1/places",
            credentials: "omit",
            headers: {
                "X-Goog-Api-Key": "AIzaSyAIfGyOk4VSltw4QnBr1r6wjK_2bkw1pU4",
                "X-Goog-FieldMask": fieldMask,
            },
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