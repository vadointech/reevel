import { QueryClient } from "@tanstack/react-query";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetNearbyPlacesQueryBuilder } from "@/features/location/picker/queries";
import { LocationSearch } from "@/components/screens/location-picker";

export namespace CreateEventLocationSearchPage {}

export async function CreateEventLocationSearchPage() {
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
        <LocationSearch placesInit={placesInit} />
    );
}