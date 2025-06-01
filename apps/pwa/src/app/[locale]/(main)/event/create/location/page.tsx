import { LocationPickerMapView } from "@/components/screens/location-picker";
import { getSession } from "@/api/auth/get-session";
import { headers } from "next/headers";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { MapProviderDefaultConfig } from "@/components/shared/map/map.config";
import { QueryClient } from "@tanstack/react-query";
import { GooglePlacesApiResponse } from "@/api/google/places/types";
import { GetNearbyPlacesQueryBuilder } from "@/features/location/picker/queries";

export default async function CreateEventLocationPage() {
    const { data: session } = await getSession({
        nextHeaders: await headers(),
    });

    const location = session?.profile.location;

    let placesInit: GooglePlacesApiResponse = { places: [] };
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
        const radius = mapProvider.getHorizontalRadius(bounds, center);

        placesInit = await queryClient.fetchQuery(
            GetNearbyPlacesQueryBuilder({
                center,
                radius,
            }),
        );
    }

    return (
        <LocationPickerMapView placesInit={placesInit} />
    );
}