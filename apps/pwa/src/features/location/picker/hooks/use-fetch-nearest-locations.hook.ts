import { useFetchQuery } from "@/lib/react-query";
import { useDebounceCallback } from "@/lib/hooks";
import { MapProviderGL } from "@/components/shared/map/providers/types/gl";
import { GOOGLE_PLACES_API_EXCLUDED_TYPES, GOOGLE_PLACES_API_INCLUDED_TYPES } from "@/features/location/picker";
import { GetNearbyPlaces, getNearbyPlaces } from "@/api/google/places";
import { googlePlacesApiResponseTransformer } from "@/features/google/transformers";
import { GooglePLacesApiIncludedTypes } from "@/api/google/places/included-types.config";

export function useFetchNearestLocations() {
    const fetchQuery = useFetchQuery();
    const debouncedCallback = useDebounceCallback();

    const getPlacesByArea = (
        center: MapProviderGL.LngLat,
        radius: number,
        includedType?: GooglePLacesApiIncludedTypes,
    ) => {
        return debouncedCallback(async() => {
            return fetchQuery({
                queryKey: [
                    ...GetNearbyPlaces.queryKey,
                    center.lng.toFixed(5),
                    center.lat.toFixed(5),
                    Math.round(radius),
                    includedType,
                ],
                queryFn: () => getNearbyPlaces({
                    body: {
                        maxResultCount: 10,
                        includedPrimaryTypes: includedType ? [includedType] : GOOGLE_PLACES_API_INCLUDED_TYPES.primaryTypes,
                        includedTypes: includedType ? [includedType] : GOOGLE_PLACES_API_INCLUDED_TYPES.secondaryTypes,
                        excludedPrimaryTypes: GOOGLE_PLACES_API_EXCLUDED_TYPES.primaryTypes,
                        excludedTypes: GOOGLE_PLACES_API_EXCLUDED_TYPES.secondaryTypes,
                        locationRestriction: {
                            circle: {
                                center: {
                                    longitude: center.lng,
                                    latitude: center.lat,
                                },
                                radius: radius,
                            },
                        },
                    },
                    params: {
                        fieldMask: ["id", "displayName", "location", "primaryType", "iconBackgroundColor", "iconMaskBaseUri", "primaryTypeDisplayName"],
                        imageMaxWidth: 100,
                        imageMaxHeight: 100,
                    },
                })
                    .then(res => res.data || { places: [] })
                    .then(googlePlacesApiResponseTransformer.filterEmptyIcons)
                    .then(googlePlacesApiResponseTransformer.filterClosePoints),
            });
        });
    };

    return {
        getPlacesByArea,
    };
}