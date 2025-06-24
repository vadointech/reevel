import { DiscoverDrawer } from "@/components/drawers/discover";
import { headers } from "next/headers";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { QueryClient } from "@tanstack/react-query";
import { GetNearbyEventsQueryBuilder } from "@/features/event/discover/queries";

export namespace DiscoverPage {
    export type Props = never;
}

export async function DiscoverPage() {
    const queryClient = new QueryClient();

    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    const eventsInit = await queryClient.fetchQuery(
        GetNearbyEventsQueryBuilder({
            center,
            radius,
            nextHeaders: await headers(),
        }),
    );

    return (
        <DiscoverDrawer eventsInit={eventsInit} />
    );
}
