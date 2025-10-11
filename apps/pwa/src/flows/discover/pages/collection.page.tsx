import { DiscoverCollectionScreen } from "@/components/screens/discover";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { eventsWithPaginationFallback, getEvents } from "@/api/discover";

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

    return (
        <DiscoverCollectionScreen
            events={events.data}
            interests={[]}
            collection={DiscoverStaticCollections.Root + `/${collectionId}`}
        >
            Discover
        </DiscoverCollectionScreen>
    );
}