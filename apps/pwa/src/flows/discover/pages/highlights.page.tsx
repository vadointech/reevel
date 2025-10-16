import dynamic from "next/dynamic";
import { extractUniqueInterests } from "@/features/discover/utils";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { eventsWithPaginationFallback, getHighlights } from "@/api/discover";
import { eventEntityToEventPointEntity } from "@/features/event/mappers";
import { EventListSeoJsonSchema, EventSeoCardGroup } from "@/components/ui/cards/event-seo-card";
import { getDefaultCity } from "@/api/discover/server";
import { API_URL } from "@/config/env.config";

const DiscoverHighlightsScreen = dynamic(() => import("@/components/screens/discover").then(module => module.DiscoverHighlightsScreen));

export namespace DiscoverHighlightsPage {
    export type Props = never;
}

export async function DiscoverHighlightsPage() {
    const city = await getDefaultCity();
  
    const { data: cityHighlights } = await getHighlights({
        params: {
            cityId: city?.id,
        },
        fallback: eventsWithPaginationFallback,
        baseURL: API_URL,
    });

    const eventPointsInit = cityHighlights.data.map(eventEntityToEventPointEntity);
  
    const interests = extractUniqueInterests(cityHighlights.data);
  
    return (
        <>
            <DiscoverHighlightsScreen
                interestsInit={interests}
                eventsInit={cityHighlights.data}
                eventPointsInit={eventPointsInit}
                collection={DiscoverStaticCollections.Highlights}
            />
            <EventSeoCardGroup
                title={`Best Events in ${city?.name || "your city"}`}
                event={cityHighlights.data}
            />
            <EventListSeoJsonSchema
                title={`Best Events in ${city?.name || "your city"}`}
                description={"Find the top events and activities in your city with Reevel Highlights. Meet new people, join local hangouts, and never miss out on what's happening nearby."}
                events={cityHighlights.data}
            />
        </>
    );
}
