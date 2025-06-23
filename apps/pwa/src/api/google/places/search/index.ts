import {
    GooglePlacesApiResponse,
    GooglePlacesApiRequestBody,
    GooglePlacesApiRestrictionRectangle,
} from "@/api/google/places/types";
import { fetcherClient } from "@/api/fetcher-client";
import { FetcherResponse } from "@/lib/fetcher/response";
import { getGooglePlacesApiFieldMask } from "@/api/google/places/_internal/field-mask";

export namespace SearchLocations {
    export type TInput = GooglePlacesApiRequestBody & {
        textQuery: string;
        locationRestriction?: GooglePlacesApiRestrictionRectangle;
    };

    export type TOutput = GooglePlacesApiResponse;

    export const queryKey = ["google/places"];
}

export const searchLocations = fetcherClient.fetch<SearchLocations.TInput, SearchLocations.TOutput>({
    fetcherFunc: async(fetcher, input) => {
        const { fieldMask, body } = getGooglePlacesApiFieldMask(input?.body);

        const result: FetcherResponse<SearchLocations.TOutput> = await fetcher.post(":searchText", {
            baseURL: "https://places.googleapis.com/v1/places",
            credentials: "omit",
            headers: {
                "X-Goog-Api-Key": "AIzaSyAIfGyOk4VSltw4QnBr1r6wjK_2bkw1pU4",
                "X-Goog-FieldMask": fieldMask + ",nextPageToken",
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