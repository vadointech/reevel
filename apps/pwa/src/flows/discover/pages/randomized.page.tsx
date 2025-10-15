import dynamic from "next/dynamic";
import { extractUniqueInterests } from "@/features/discover/utils";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { getRandomizedEvents } from "@/api/discover";
import { eventEntityToEventPointEntity } from "@/features/event/mappers";
import { EventListSeoJsonSchema, EventSeoCardGroup } from "@/components/ui/cards/event-seo-card";
import { getDefaultCity } from "@/api/discover/server";

const DiscoverRandomizedScreen = dynamic(() => import("@/components/screens/discover").then(module => module.DiscoverRandomizedScreen));

export namespace DiscoverRandomizedPage {
    export type Props = never;
}

export async function DiscoverRandomizedPage() {
    const city = await getDefaultCity();

    const { data: randomizedEvents } = await getRandomizedEvents({
        params: {
            cityId: city?.id,
        },
        fallback: [],
    });

    const eventPointsInit = randomizedEvents.map(eventEntityToEventPointEntity);

    const interests = extractUniqueInterests(randomizedEvents);

    return (
        <>
            <DiscoverRandomizedScreen
                interestsInit={interests}
                eventsInit={randomizedEvents}
                eventPointsInit={eventPointsInit}
                collection={DiscoverStaticCollections.Randomize}
            />

            <EventSeoCardGroup
                title={"Random Events Near You"}
                event={randomizedEvents}
            />
            <EventListSeoJsonSchema
                title={`Best Events in ${city?.name || "your city"}`}
                description={"Discover random events around you with Reevel. Join hangouts, explore activities, and meet people who share your interests."}
                events={randomizedEvents}
            />
        </>
    );
}
