import dynamic from "next/dynamic";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { Navigation, NavigationRoutes } from "@/components/shared/navigation";
import { getInitialInterests } from "@/api/interests";
import { getDefaultCity } from "@/api/discover/server";
import { EventEntity, EventPointEntity } from "@/entities/event";
import { eventsWithPaginationFallback, getHighlights, getNearbyEvents } from "@/api/discover";
import { SpatialGrid } from "@repo/spatial-grid";
import { EventListSeoJsonSchema, EventSeoCardGroup } from "@/components/ui/cards/event-seo-card";

const DiscoverScreen = dynamic(() => import("@/components/screens/discover").then(module => module.DiscoverScreen));

export namespace DiscoverPage {
    export type Props = never;
}

export async function DiscoverPage() {
    const { data: interests } = await getInitialInterests({
        fallback: [],
    });

    let eventPointsInit: EventPointEntity[] = [];
    let cityHighlights: EventEntity[] = [];

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

        eventPointsInit = nearbyEventsResponse.data;
        cityHighlights = highlightsResponse.data.data;
    }

    return (
        <>
            <DiscoverScreen
                cityInit={city}
                eventPointsInit={eventPointsInit}
                interestsInit={interests}
                interestCollectionsInit={interests}
                highlightsInit={cityHighlights}
                collection={DiscoverStaticCollections.Root}
            />
            <Navigation currentPage={NavigationRoutes.Discover} />
            <EventSeoCardGroup
                title={`Discover events and hangouts in ${city?.name || "your city"}`}
                event={cityHighlights}
            />
            <EventListSeoJsonSchema
                title={`Discover events and hangouts in ${city?.name || "your city"}`}
                description={"Discover the best events happening in your city with Reevel Highlights. From concerts and festivals to casual hangouts – explore things to do near you today."}
                events={cityHighlights}
            />
        </>
    );
}
