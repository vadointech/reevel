import { FetchQueryOptions } from "@tanstack/react-query";
import { GOOGLE_PLACES_API_EXCLUDED_TYPES, GOOGLE_PLACES_API_INCLUDED_TYPES } from "../config/places.config";
import { getNearbyPlaces, GetNearbyPlaces } from "@/api/google/places";
import { MapProviderGL } from "@/components/shared/map/types";
import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";
import { PlaceLocationEntity } from "@/entities/place";
import { QueryBuilder } from "@/types/common";

export namespace GetNearbyPlacesQueryBuilder {
    export type TInput = {
        center: MapProviderGL.LngLat,
        radius: number,
        regionId?: string,
        placeType?: string;
        signal?: AbortSignal;
    };

    export type TOutput = PlaceLocationEntity[];
}

export const GetNearbyPlacesQueryBuilder: QueryBuilder<GetNearbyPlacesQueryBuilder.TInput, GetNearbyPlacesQueryBuilder.TOutput> = (
    input: GetNearbyPlacesQueryBuilder.TInput,
): FetchQueryOptions<GetNearbyPlacesQueryBuilder.TOutput> => {
    return {
        queryKey: GetNearbyPlacesQueryBuilder.queryKey([input.regionId]),
        queryFn: () => getNearbyPlaces({
            body: {
                maxResultCount: input.placeType ? 20 : 10,
                includedPrimaryTypes: input.placeType ? [input.placeType] : GOOGLE_PLACES_API_INCLUDED_TYPES.primaryTypes,
                includedTypes: input.placeType ? [input.placeType] : GOOGLE_PLACES_API_INCLUDED_TYPES.secondaryTypes,
                excludedPrimaryTypes: GOOGLE_PLACES_API_EXCLUDED_TYPES.primaryTypes,
                excludedTypes: GOOGLE_PLACES_API_EXCLUDED_TYPES.secondaryTypes,
                languageCode: "uk",
                locationRestriction: {
                    circle: {
                        center: {
                            longitude: input.center.lng,
                            latitude: input.center.lat,
                        },
                        radius: input.radius,
                    },
                },
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
            .then(googlePlacesApiResponseTransformer.filterClosePoints)
            .then(googlePlacesApiResponseTransformer.formatAddress)
            .then(googlePlacesApiResponseMapper.toPlaceLocationEntity),
    };
};

GetNearbyPlacesQueryBuilder.queryKey = (params = []) => {
    return [...GetNearbyPlaces.queryKey, ...params];
};