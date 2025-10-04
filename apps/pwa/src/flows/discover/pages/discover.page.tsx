import { getCurrentUserInterests } from "@/api/user/server";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetCityHighlightsQueryBuilder, GetNearbyEventsQueryBuilder } from "@/features/discover/queries";
import { DiscoverScreen } from "@/components/screens/discover";
import { getEventCollectionsFeed } from "@/api/event/server";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { Navigation, NavigationRoutes } from "@/components/shared/navigation";
import { seedEventUsers } from "@/features/event/utils";

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
    });

    const interests = await getCurrentUserInterests();

    let cityHighlights = await GetCityHighlightsQueryBuilder.queryFunc({
        center,
        radius,
    });
    cityHighlights = seedEventUsers(cityHighlights);

    const collectionsInit = await getEventCollectionsFeed();

    return (
        <>
            <DiscoverScreen
                interestsInit={interests}
                collectionsInit={collectionsInit || []}
                cityHighlights={cityHighlights || []}
                eventsInit={eventsInit}
                collection={DiscoverStaticCollections.Root}
            />
            <Navigation currentPage={NavigationRoutes.Discover} />
        </>
    );
}
