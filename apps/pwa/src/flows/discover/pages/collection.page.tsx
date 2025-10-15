import dynamic from "next/dynamic";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { eventsWithPaginationFallback, getEvents } from "@/api/discover";
import { eventEntityToEventPointEntity } from "@/features/event/mappers";
import { extractUniqueInterests } from "@/features/discover/utils";
import { getInterestById } from "@/api/interests";
import { EventSeoCardGroup } from "@/components/ui/cards/event-seo-card/event-seo-card.component";
import { EventListSeoJsonSchema } from "@/components/ui/cards/event-seo-card";

const DiscoverCollectionScreen = dynamic(() => import("@/components/screens/discover").then(module => module.DiscoverCollectionScreen));

export namespace DiscoverCollectionPage {
    export type Props = {
        collectionId: string;
    };
}

export async function DiscoverCollectionPage({ collectionId }: DiscoverCollectionPage.Props) {

    const [
        interestResponse,
        eventsResponse,
    ] = await Promise.all([
        getInterestById({
            body: collectionId,
        }),
        getEvents({
            params: {
                interestId: collectionId,
            },
            fallback: eventsWithPaginationFallback,
        }),
    ]);

    const interest = interestResponse.data;
    const events = eventsResponse.data.data;

    const eventPointsInit = events.map(eventEntityToEventPointEntity);

    const interests = extractUniqueInterests(events);

    return (
        <>
            <DiscoverCollectionScreen
                eventsInit={events}
                interestsInit={interests}
                eventPointsInit={eventPointsInit}
                collection={DiscoverStaticCollections.Root + `/${collectionId}`}
            >
                Discover { interest?.title_en }
            </DiscoverCollectionScreen>
            <EventSeoCardGroup
                title={`Discover ${interest?.title_en}`}
                event={events}
            />
            <EventListSeoJsonSchema
                title={`Discover ${interest?.title_en}`}
                description={`Discover ${interest?.title_en} events and hangouts nearby. Join groups, meet new people, and explore fun activities with Reevel.`}
                events={events}
            />
        </>
    );
}