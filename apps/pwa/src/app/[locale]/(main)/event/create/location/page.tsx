import { LocationPickerMapView } from "@/components/screens/location-picker";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { QueryClient } from "@tanstack/react-query";
import { GetNearbyPlacesQueryBuilder } from "@/features/location/picker/queries";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";

export default async function CreateEventLocationPage() {
    const queryClient = new QueryClient();

    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    const placesInit = await queryClient.fetchQuery(
        GetNearbyPlacesQueryBuilder({
            center,
            radius,
        }),
    ).then(googlePlacesApiResponseTransformer.formatAddress);

    return (
        <LocationPickerMapView placesInit={placesInit} />
    );
}