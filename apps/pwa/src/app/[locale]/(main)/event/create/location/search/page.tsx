import { LocationSearch } from "@/app/[locale]/(main)/event/create/_components/create-event-form/location-search";
import { getSession } from "@/api/auth/get-session";
import { headers } from "next/headers";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { MapProviderDefaultConfig } from "@/components/shared/map/map.config";
import { createBufferedBounds, snapRadius } from "@/features/location/picker/utils/map-dimentions";

export default async function CreateEventLocationSearchPage() {
    const { data: session } = await getSession({
        nextHeaders: await headers(),
    });

    const location = session?.profile.location;

    const mapProvider = new MapRootProvider({
        ...MapProviderDefaultConfig,
        viewState: {
            ...MapProviderDefaultConfig.viewState,
            center: location?.center.coordinates,
            bboxPolygon: location?.bbox.coordinates,
        },
    });

    const { bounds, center } = mapProvider.internalConfig.viewState;
    let queryKey: unknown[] = [];

    if(bounds && center) {
        const bufferedBounds = createBufferedBounds(bounds);
        const bufferedRadius = mapProvider.getHorizontalRadius(bufferedBounds, center);
        const snappedRadius = snapRadius(bufferedRadius);

        queryKey = [
            "places/nearby",
            center.lng.toFixed(2),
            center.lat.toFixed(2),
            snappedRadius,
        ];
    }

    return (
        <LocationSearch
            queryKey={queryKey}
        />
    );
}