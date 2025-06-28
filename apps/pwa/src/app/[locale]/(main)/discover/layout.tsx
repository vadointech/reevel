import { PropsWithChildren } from "react";
import { MapView } from "@/components/shared/map";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetNearbyEventsQueryBuilder } from "@/features/event/discover/queries";
import { headers } from "next/headers";
import { eventEntityMapper } from "@/entities/event/mapper";
import { DiscoverProvider } from "@/features/event/discover";

export default async function Layout({ children }: PropsWithChildren) {
    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    const events = await GetNearbyEventsQueryBuilder.queryFunc({
        center,
        radius,
        nextHeaders: await headers(),
    });

    const points = eventEntityMapper.toEventPoint(events);

    return (
        <DiscoverProvider>
            <MapView
                viewState={{
                    padding: {
                        bottom: 260,
                    },
                }}
                points={points}
            />
            { children }
        </DiscoverProvider>
    );
}