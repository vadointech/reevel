import { QueryBuilder } from "@/types/common";
import { FetchQueryOptions } from "@tanstack/react-query";
import { GetNearbyPlaces, getPlaceByCoordinates, GetPlaceByCoordinates } from "@/api/google/places";
import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";

export namespace GetPlacesByCoordinatesQueryBuilder {
    export type TInput = {
        signal?: AbortSignal;
    };
}

export const GetPlacesByCoordinatesQueryBuilder: QueryBuilder<GetPlaceByCoordinates.TParams, GetPlaceByCoordinates.TOutput> = (
    input: GetPlacesByCoordinatesQueryBuilder.TInput,
): FetchQueryOptions<GetNearbyPlaces.TOutput> => {
    return {
        queryKey: GetPlacesByCoordinatesQueryBuilder.queryKey([]),
        queryFn: () => getPlaceByCoordinates({
            body: {
                languageCode: "uk",
                fieldMask: [
                    "id",
                    "displayName",
                    "location",
                    "primaryType",
                    "primaryTypeDisplayName",
                    "formattedAddress",
                    "addressComponents",
                    "googleMapsUri",
                ],
            },
            signal: input.signal,
        })
            .then(response => response.data || { places: [] })
            .then(googlePlacesApiResponseTransformer.formatAddress),
    };
};

GetPlacesByCoordinatesQueryBuilder.queryKey = (params) => {
    return [...GetPlaceByCoordinates.queryKey, ...params];
};