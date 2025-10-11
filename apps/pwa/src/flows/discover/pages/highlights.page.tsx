import { DiscoverHighlightsScreen } from "@/components/screens/discover";
import { extractUniqueInterests } from "@/features/discover/utils";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { eventsWithPaginationFallback, getCityHighlights } from "@/api/discover";

export namespace DiscoverHighlightsPage {
    export type Props = never;
}

export async function DiscoverHighlightsPage() {
    const { data: cityHighlights } = await getCityHighlights({
        params: {},
        fallback: eventsWithPaginationFallback,
    });
    const interests = extractUniqueInterests(cityHighlights.data);
  
    return (
        <DiscoverHighlightsScreen
            events={cityHighlights.data}
            interests={interests}
            collection={DiscoverStaticCollections.Highlights}
        />
    );
}
