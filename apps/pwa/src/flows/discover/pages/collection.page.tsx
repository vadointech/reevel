import { headers } from "next/headers";
import { getCurrentUserInterests } from "@/api/user/server";
import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetNearbyEventsQueryBuilder } from "@/features/event/discover/queries";

export namespace DiscoverCollectionPage {
    export type Props = {
        collectionId: string;
        callbackUrl: string;
    };
}

export async function DiscoverCollectionPage() {
    const { data: interests } = await getCurrentUserInterests({
        nextHeaders: await headers(),
    });

    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    const eventsInit = await GetNearbyEventsQueryBuilder.queryFunc({
        center,
        radius,
        nextHeaders: await headers(),
    });

    return (
        <DiscoverCollectionDrawer
            events={eventsInit}
            interests={interests?.map(item => item.interest) || []}
        >
            Don't Miss in Vinnitsa
        </DiscoverCollectionDrawer>
    );
}