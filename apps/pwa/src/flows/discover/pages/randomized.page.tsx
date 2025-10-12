import { DiscoverRandomizedScreen } from "@/components/screens/discover";
import { extractUniqueInterests } from "@/features/discover/utils";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { getRandomizedEvents } from "@/api/discover";
import { eventEntityToEventPointEntity } from "@/features/event/mappers";

export namespace DiscoverRandomizedPage {
    export type Props = never;
}

export async function DiscoverRandomizedPage() {
    const { data: randomizedEvents } = await getRandomizedEvents({
        params: {},
        fallback: [],
    });

    const eventPointsInit = randomizedEvents.map(eventEntityToEventPointEntity);

    const interests = extractUniqueInterests(randomizedEvents);

    return (
        <DiscoverRandomizedScreen
            interestsInit={interests}
            eventsInit={randomizedEvents}
            eventPointsInit={eventPointsInit}
            collection={DiscoverStaticCollections.Randomize}
        />
    );
}
