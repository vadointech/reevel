import { headers } from "next/headers";
import { DiscoverHighlightsScreen } from "@/components/screens/discover";
import { extractUniqueInterests } from "@/features/discover/utils";
import { GetCityHighlightsQueryBuilder } from "@/features/discover/queries";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { DiscoverStaticCollections } from "@/features/discover/config";

export namespace DiscoverHighlightsPage {
    export type Props = never;
}

export async function DiscoverHighlightsPage() {
    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    const cityHighlights = await GetCityHighlightsQueryBuilder.queryFunc({
        center,
        radius,
        nextHeaders: await headers(),
    });
    const interests = extractUniqueInterests(cityHighlights);
  
    return (
        <DiscoverHighlightsScreen
            events={cityHighlights}
            interests={interests}
            collection={DiscoverStaticCollections.Highlights}
        />
    );
}
