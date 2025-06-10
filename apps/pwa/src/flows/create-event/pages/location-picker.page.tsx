import { QueryClient } from "@tanstack/react-query";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetNearbyPlacesQueryBuilder } from "@/features/location/picker/queries";
import { LocationPickerMapView } from "@/components/screens/location-picker";

export namespace CreateEventLocationPickerPage {
    export type Props = never;
}

export async function CreateEventLocationPickerPage() {
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
    );

    return (
        <LocationPickerMapView placesInit={placesInit} />
    );
}
