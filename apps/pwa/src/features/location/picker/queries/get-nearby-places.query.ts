import { FetchQueryOptions } from "@tanstack/react-query";
import { GOOGLE_PLACES_API_EXCLUDED_TYPES, GOOGLE_PLACES_API_INCLUDED_TYPES } from "../config/places.config";
import { getNearbyPlaces, GetNearbyPlaces } from "@/api/google/places";
import { MapProviderGL } from "@/components/shared/map/types";

export namespace GetNearbyPlacesQueryBuilder {
    export type TInput = {
        center: MapProviderGL.LngLat,
        radius: number,
        regionId?: string,
        type?: string;
        signal?: AbortSignal;
    };
}

export function GetNearbyPlacesQueryBuilder(
    input: GetNearbyPlacesQueryBuilder.TInput,
): FetchQueryOptions<GetNearbyPlaces.TOutput> {
    return {
        queryKey: [...GetNearbyPlaces.queryKey, input.regionId],
        queryFn: () => getNearbyPlaces({
            body: {
                maxResultCount: 10,
                includedPrimaryTypes: input.type ? [input.type] : GOOGLE_PLACES_API_INCLUDED_TYPES.primaryTypes,
                includedTypes: input.type ? [input.type] : GOOGLE_PLACES_API_INCLUDED_TYPES.secondaryTypes,
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
            },
            params: {
                fieldMask: [
                    "id",
                    "displayName",
                    "location",
                    "primaryType",
                    "primaryTypeDisplayName",
                    "formattedAddress",
                    "addressComponents",
                ],
            },
            signal: input.signal,
        }).then(response => response.data || { places: [] }),
        staleTime: Infinity,
    };
}