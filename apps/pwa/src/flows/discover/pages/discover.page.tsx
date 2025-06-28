import { headers } from "next/headers";
import { getCurrentUserInterests } from "@/api/user/server";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetCityHighlightsQueryBuilder, GetNearbyEventsQueryBuilder } from "@/features/event/discover/queries";
import { DiscoverScreen } from "@/components/screens/discover";
import { getEventCollectionsFeed } from "@/api/event";

export namespace DiscoverPage {
    export type Props = never;
}

export async function DiscoverPage() {
    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    const eventsInit = await GetNearbyEventsQueryBuilder.queryFunc({
        center,
        radius,
        nextHeaders: await headers(),
    });

    const { data: interests } = await getCurrentUserInterests({
        nextHeaders: await headers(),
    });

    const cityHighlights = await GetCityHighlightsQueryBuilder.queryFunc({
        center,
        radius,
        nextHeaders: await headers(),
    });

    const { data: collectionsInit } = await getEventCollectionsFeed({
        nextHeaders: await headers(),
    });

    return (
        <DiscoverScreen
            interestsInit={interests?.map(item => item.interest) || []}
            collectionsInit={collectionsInit || []}
            cityHighlights={cityHighlights || []}
            eventsInit={eventsInit}
            callbackUrl={"/discover"}
        />
    );
}
