import { fetcherClient } from "@/api/fetcher-client";
import {
    GooglePlacesApiRequestBody,
    GooglePlacesApiRequestParams,
    GooglePlacesApiResponse,
} from "@/api/google/places/types";

export namespace SearchLocations {
    export type TInput = Partial<GooglePlacesApiRequestBody>  & {
        textQuery: string;
    };
    export type TOutput = GooglePlacesApiResponse;
    export type TParams = GooglePlacesApiRequestParams;

    export const queryKey = ["places/search"];
}

export const searchLocations = fetcherClient<SearchLocations.TInput, SearchLocations.TOutput, SearchLocations.TParams>({
    fetcherFunc: async(fetcher, input) => {
        let fieldMask = "places.id,places.displayName,place.location";

        if(input?.params?.fieldMask) {
            fieldMask = input.params.fieldMask.map(mask => `places.${mask}`).join(",");
        }

        const result = await fetcher.post(":searchText", {
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