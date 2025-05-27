import { LocationPickerMapView } from "@/components/screens/location-picker";
import { getSession } from "@/api/auth/get-session";
import { headers } from "next/headers";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { MapProviderDefaultConfig } from "@/components/shared/map/map.config";
import { GetNearbyPlaces, getNearbyPlaces } from "@/api/google/places";
import {
    GOOGLE_PLACES_API_EXCLUDED_TYPES,
    GOOGLE_PLACES_API_INCLUDED_TYPES,
} from "@/features/location/picker";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function CreateEventLocationPage() {
    const { data: session } = await getSession({
        nextHeaders: await headers(),
    });

    const location = session?.profile.location;

    const queryClient = new QueryClient();

    if(session) {
        const mapProvider = new MapRootProvider({
            ...MapProviderDefaultConfig,
            viewState: {
                ...MapProviderDefaultConfig.viewState,
                center: location?.center.coordinates,
                bboxPolygon: location?.bbox.coordinates,
            },
        });

        const { bounds, center } = mapProvider.internalConfig.viewState;

        if(bounds && center) {
            const radius = mapProvider.getHorizontalRadius(bounds, center);

            await queryClient.prefetchQuery({
                queryKey: [
                    ...GetNearbyPlaces.queryKey,
                    center.lng.toFixed(5),
                    center.lat.toFixed(5),
                    Math.round(radius),
                ],
                queryFn: async() => getNearbyPlaces({
                    nextHeaders: await headers(),
                    body: {
                        maxResultCount: 10,
                        includedPrimaryTypes: GOOGLE_PLACES_API_INCLUDED_TYPES.primaryTypes,
                        includedTypes: GOOGLE_PLACES_API_INCLUDED_TYPES.secondaryTypes,
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
                        fieldMask: [
                            "id",
                            "displayName",
                            "location",
                            "primaryType",
                            "primaryTypeDisplayName",
                        ],
                    },
                }).then(response => response.data || { places: [] }),
            });
        }
    }


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LocationPickerMapView placesInit={[]} />;
        </HydrationBoundary>
    );
}