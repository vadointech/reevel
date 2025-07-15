import { headers } from "next/headers";
import { DiscoverCollectionScreen } from "@/components/screens/discover";
import { extractUniqueInterests } from "@/features/event/discover/utils";
import { GetNearbyEventsQueryBuilder } from "@/features/event/discover/queries";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";

export namespace DiscoverCollectionPage {
    export type Props = {
        collectionId: string;
    };
}

export async function DiscoverCollectionPage({ collectionId }: DiscoverCollectionPage.Props) {
    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    const events = await GetNearbyEventsQueryBuilder.queryFunc({
        center,
        radius,
        nextHeaders: await headers(),
        filter: collectionId,
    });

    const interests = extractUniqueInterests(events);

    let interestTitle = "Discover Interest";

    const collectionInterest = interests.find(item => item.slug = collectionId);
    if(collectionInterest) {
        interestTitle = `Discover ${collectionInterest.title_uk}`;
    }

    return (
        <DiscoverCollectionScreen
            events={events}
            interests={interests}
            callbackUrl={`/discover/${collectionId}`}
        >
            { interestTitle }
        </DiscoverCollectionScreen>
    );
}