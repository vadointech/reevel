import { DiscoverHighlightsScreen } from "@/components/screens/discover";
import { extractUniqueInterests } from "@/features/discover/utils";
import { GetCityHighlightsQuery } from "@/features/discover/queries";
import { DiscoverStaticCollections } from "@/features/discover/config";

export namespace DiscoverHighlightsPage {
    export type Props = never;
}

export async function DiscoverHighlightsPage() {
    const cityHighlights = await GetCityHighlightsQuery.queryFunc();
    const interests = extractUniqueInterests(cityHighlights);
  
    return (
        <DiscoverHighlightsScreen
            events={cityHighlights}
            interests={interests}
            collection={DiscoverStaticCollections.Highlights}
        />
    );
}
