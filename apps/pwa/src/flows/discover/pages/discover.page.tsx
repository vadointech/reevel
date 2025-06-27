import { headers } from "next/headers";
import { getCurrentUserInterests, getSession } from "@/api/user/server";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetNearbyEventsQueryBuilder } from "@/features/event/discover/queries";
import { DiscoverScreen } from "@/components/screens/discover";
import { getCityHighlights } from "@/api/event/server";
import { EventEntity } from "@/entities/event";
import { getEventCollections } from "@/api/event/get-collections";

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

    const { data: session } = await getSession({
        nextHeaders: await headers(),
    });

    const { data: interests } = await getCurrentUserInterests({
        nextHeaders: await headers(),
    });

    let cityHighlights: EventEntity[] = [];

    if(session?.profile?.location) {
        const cityHighlightsResponse = await getCityHighlights({
            nextHeaders: await headers(),
            params: {
                city: session?.profile?.location?.id,
            },
        });
        cityHighlights = cityHighlightsResponse.data || [];
    }

    const { data: collectionsInit } = await getEventCollections({
        nextHeaders: await headers(),
    });

    return (
        <DiscoverScreen
            interestsInit={interests?.map(item => item.interest) || []}
            collectionsInit={collectionsInit || []}
            cityHighlights={cityHighlights}
            eventsInit={eventsInit}
        />
    );
}
