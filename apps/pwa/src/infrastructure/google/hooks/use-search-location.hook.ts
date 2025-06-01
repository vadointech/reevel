import { useFetchQuery } from "@/lib/react-query";
import { SearchLocations, searchLocations } from "@/api/google/places/search";
import { MapProviderGL } from "@/components/shared/map/types";
import { GetNearbyPlaces } from "@/api/google/places";

export function useSearchLocation() {
    const fetchQuery = useFetchQuery();

    const searchPlacesByTextQuery = (
        query: string,
        locationRestriction?: {
            center: MapProviderGL.LngLat,
            radius: number,
        },
    ) => {
        return fetchQuery({
            queryKey: [
                // ...SearchLocations.queryKey,
                ...GetNearbyPlaces.queryKey,
                query,
                ...(
                    locationRestriction ? [
                        locationRestriction.center.lng.toFixed(5),
                        locationRestriction.center.lat.toFixed(5),
                        Math.round(locationRestriction.radius),
                    ] : []
                ),
            ],
            queryFn: () => searchLocations({
                body: {
                    textQuery: query,
                    languageCode: "uk",
                    locationBias: locationRestriction ? {
                        circle: {
                            center: {
                                longitude: locationRestriction.center.lng,
                                latitude: locationRestriction.center.lat,
                            },
                            radius: locationRestriction.radius,
                        },
                    } : undefined,
                },
                params: {
                    fieldMask: [
                        "id",
                        "displayName",
                        "primaryType",
                        "primaryTypeDisplayName",
                        "location",
                        "formattedAddress",
                        "addressComponents",
                    ],
                },
            }).then(res => res.data || { places: [] }),
        });
    };

    return {
        searchPlacesByTextQuery,
    };
}