import { DiscoverHighlightsScreen } from "@/components/screens/discover";
import { extractUniqueInterests } from "@/features/discover/utils";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { eventsWithPaginationFallback, getHighlights } from "@/api/discover";
import { eventEntityToEventPointEntity } from "@/features/event/mappers";

export namespace DiscoverHighlightsPage {
    export type Props = never;
}

export async function DiscoverHighlightsPage() {
    const { data: cityHighlights } = await getHighlights({
        params: {},
        fallback: eventsWithPaginationFallback,
    });

    const eventPointsInit = cityHighlights.data.map(eventEntityToEventPointEntity);
  
    const interests = extractUniqueInterests(cityHighlights.data);
  
    return (
        <DiscoverHighlightsScreen
            interestsInit={interests}
            eventsInit={cityHighlights.data}
            eventPointsInit={eventPointsInit}
            collection={DiscoverStaticCollections.Highlights}
        />
    );
}
