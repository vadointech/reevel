import { useFetchQuery } from "@/lib/react-query";
import { MapProviderGL } from "@/components/shared/map/types/provider/gl";
import { GOOGLE_PLACES_API_EXCLUDED_TYPES, GOOGLE_PLACES_API_INCLUDED_TYPES } from "@/features/location/picker";
import { GetNearbyPlaces, getNearbyPlaces } from "@/api/google/places";
import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";
import { GooglePLacesApiIncludedTypes } from "@/api/google/places/included-types.config";

export function useFetchNearestLocations() {
    const fetchQuery = useFetchQuery();

    const getPlacesByArea = (
        center: MapProviderGL.LngLat,
        radius: number,
        includedType?: GooglePLacesApiIncludedTypes | null,
    ) => {
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
                    languageCode: "uk",
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
                    fieldMask: ["id", "displayName", "location", "primaryType", "primaryTypeDisplayName"],
                },
            })
                .then(res => res.data || { places: [] })
                .then(googlePlacesApiResponseTransformer.filterClosePoints),
        });
    };

    return {
        getPlacesByArea,
    };
}