import { fetcherClient } from "@/api/fetcher-client";
import {
    GooglePlacesApiRequestBody,
    GooglePlacesApiRequestParams,
    GooglePlacesApiResponse,
} from "../types";
import { FetcherResponse } from "@/lib/fetcher/types";

export namespace GetNearbyPlaces {
    export type TInput = GooglePlacesApiRequestBody;

    export type TParams = Partial<GooglePlacesApiRequestParams>;

    export type TOutput = GooglePlacesApiResponse;

    export const queryKey = ["places/nearby"];
}

export const getNearbyPlaces = fetcherClient<GetNearbyPlaces.TInput, GetNearbyPlaces.TOutput, GetNearbyPlaces.TParams>({
    fetcherFunc: async(fetcher, input) => {
        let fieldMask = "places.id,places.displayName,place.location";

        if(input?.params?.fieldMask) {
            fieldMask = input.params.fieldMask.map(mask => `places.${mask}`).join(",");
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
            result.data.places = result.data.places.map(item => {
                if(!item.photos || item.photos.length === 0) return item;

                const photos = item.photos.map(photo => ({
                    ...photo,
                    imageUri: `https://places.googleapis.com/v1/${photo.name}/media?key=AIzaSyAIfGyOk4VSltw4QnBr1r6wjK_2bkw1pU4&maxWidthPx=${
                        input?.params?.imageMaxWidth || input?.params?.imageMaxHeight || photo.widthPx
                    }&maxHeightPx=${
                        input?.params?.imageMaxHeight || input?.params?.imageMaxWidth || photo.heightPx
                    }`,
                }));

                return {
                    ...item,
                    photos,
                };
            });

            result.data.places = result.data.places.map(item => ({
                ...item,
                iconMaskBaseUri: item.iconMaskBaseUri + ".png",
            }));
        }

        return result;
    },
});