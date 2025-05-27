import { LocationSearch } from "@/app/[locale]/(main)/event/create/_components/create-event-form/location-search";
import { getSession } from "@/api/auth/get-session";
import { headers } from "next/headers";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { MapProviderDefaultConfig } from "@/components/shared/map/map.config";
import { getNearbyPlaces } from "@/api/google/places";
import {
    GOOGLE_PLACES_API_RECOMMENDED_TYPES,
} from "@/features/location/picker";
import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";
import { IconPoint, Point } from "@/components/shared/map/types";

export default async function CreateEventLocationSearchPage() {
    const { data: session } = await getSession({
        nextHeaders: await headers(),
    });

    const location = session?.profile.location;

    let placesInit: Point<IconPoint>[] = [];

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

            placesInit = await getNearbyPlaces({
                nextHeaders: await headers(),
                body: {
                    maxResultCount: 5,
                    includedPrimaryTypes: GOOGLE_PLACES_API_RECOMMENDED_TYPES.includedTypes,
                    includedTypes: GOOGLE_PLACES_API_RECOMMENDED_TYPES.includedTypes,
                    excludedPrimaryTypes: GOOGLE_PLACES_API_RECOMMENDED_TYPES.excludedTypes,
                    excludedTypes: GOOGLE_PLACES_API_RECOMMENDED_TYPES.excludedTypes,
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
                        "formattedAddress",
                        "addressComponents",
                    ],
                },
            })
                .then(response => response.data || { places: [] })
                .then(googlePlacesApiResponseTransformer.formatAddress)
                .then(googlePlacesApiResponseMapper.toIconPoint);
        }
    }

    return <LocationSearch placesInit={placesInit} />;
}