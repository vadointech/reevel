import { DiscoverRandomizedScreen } from "@/components/screens/discover";
import { extractUniqueInterests } from "@/features/discover/utils";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetRandomizedEventsQueryBuilder } from "@/features/discover/queries";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { seedEventUsers } from "@/features/event/utils";

export namespace DiscoverRandomizedPage {
    export type Props = never;
}

export async function DiscoverRandomizedPage() {
    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    let randomizedEvents = await GetRandomizedEventsQueryBuilder.queryFunc({
        center,
        radius,
    });
    randomizedEvents = seedEventUsers(randomizedEvents);

    const interests = extractUniqueInterests(randomizedEvents);

    return (
        <DiscoverRandomizedScreen
            events={randomizedEvents}
            interests={interests}
            collection={DiscoverStaticCollections.Randomize}
        />
    );
}
