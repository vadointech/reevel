import { DiscoverScreen } from "@/components/screens/discover";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { Navigation, NavigationRoutes } from "@/components/shared/navigation";
import { getInitialInterests } from "@/api/interests";
import { getDefaultCity } from "@/api/discover/server";
import { EventEntity, EventPointEntity } from "@/entities/event";
import { eventsWithPaginationFallback, getHighlights, getNearbyEvents } from "@/api/discover";
import { SpatialGrid } from "@repo/spatial-grid";

export namespace DiscoverPage {
    export type Props = never;
}

export async function DiscoverPage() {
    const { data: interests } = await getInitialInterests({
        fallback: [],
    });

    let cityHighlights: EventEntity[] = [];
    let eventInit: EventPointEntity[] = [];

    const city = await getDefaultCity();

    if(city) {
        const spatialGrid = new SpatialGrid();

        const [lng, lat] = city.center.coordinates;

        const tile = spatialGrid.getTile({ lng, lat }, 10);

        const [
            nearbyEventsResponse,
            highlightsResponse,
        ] = await Promise.all([
            getNearbyEvents({
                params: {
                    tileId: tile.hash,
                    zoom: tile.zoom,
                },
                fallback: [],
            }),
            getHighlights({
                params: { cityId: city.id },
                fallback: eventsWithPaginationFallback,
            }),
        ]);

        eventInit = nearbyEventsResponse.data;
        cityHighlights = highlightsResponse.data.data;
    }

    return (
        <>
            <DiscoverScreen
                eventsInit={eventInit}
                interestsInit={interests}
                collectionsInit={interests}
                cityHighlights={cityHighlights}
                collection={DiscoverStaticCollections.Root}
            />
            <Navigation currentPage={NavigationRoutes.Discover} />
        </>
    );
}
