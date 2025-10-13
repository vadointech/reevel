import { DiscoverCollectionScreen } from "@/components/screens/discover";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { eventsWithPaginationFallback, getEvents } from "@/api/discover";
import { eventEntityToEventPointEntity } from "@/features/event/mappers";
import { extractUniqueInterests } from "@/features/discover/utils";

export namespace DiscoverCollectionPage {
    export type Props = {
        collectionId: string;
    };
}

export async function DiscoverCollectionPage({ collectionId }: DiscoverCollectionPage.Props) {
    const { data: events } = await getEvents({
        params: {
            interestId: collectionId,
        },
        fallback: eventsWithPaginationFallback,
    });

    const eventPointsInit = events.data.map(eventEntityToEventPointEntity);

    const interests = extractUniqueInterests(events.data);

    return (
        <DiscoverCollectionScreen
            eventsInit={events.data}
            interestsInit={interests}
            eventPointsInit={eventPointsInit}
            collection={DiscoverStaticCollections.Root + `/${collectionId}`}
        >
            Discover
        </DiscoverCollectionScreen>
    );
}