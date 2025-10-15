import { Metadata } from "next";
import { PropsWithParams } from "@/types/common";
import { EventAttendeePublicViewPage } from "@/flows/event-view/pages";
import { getEvent } from "@/api/event/server";
import { defaultMetadata } from "@/config/metadata.config";
import { BASE_URL } from "@/config/env.config";
import { getDefaultCity } from "@/api/discover/server";
import { EventEntity } from "@/entities/event";
import { getHighlights } from "@/api/discover";
import { paginationPlaceholder } from "@/entities/placeholders";

export const revalidate = 86400;

export async function generateMetadata({ params }: PropsWithParams<{ slug: string }>): Promise<Metadata> {
    const { slug } = await params;
    const event = await getEvent({
        eventId: slug,
    });

    if(!event) {
        return {};
    }

    const title = `${event.title} | Reevel – Find Local Events & Meet New People Near You`;
    const description = `Join "${event.title}" on Reevel. Discover local events near you, meet new people, and explore things to do.`;
    const url = `${BASE_URL}/discover/event/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            ...defaultMetadata.openGraph,
            title,
            description,
            url,
            images: [
                {
                    url: event.poster,
                    width: 1200,
                    height: 630,
                    alt: `${event.title} – Event on Reevel`,
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title,
            description,
            images: [
                {
                    url: event.poster,
                    width: 1200,
                    height: 630,
                    alt: `${event.title} – Event on Reevel`,
                },
            ],
        },
    };
}

export async function generateStaticParams() {
    const city = await getDefaultCity();

    let events: EventEntity[] = [];

    if(city) {
        const eventsResponse = await getHighlights({
            params: {
                cityId: city.id,
            },
            fallback: {
                data: [],
                pagination: paginationPlaceholder,
            },
        });
        events = eventsResponse.data.data;
    }

    return events.map(event => ({ slug: event.id }));
}

export default async function Page({ params }: PropsWithParams<{ slug: string }>) {
    const { slug } = await params;
    return (
        <EventAttendeePublicViewPage eventId={slug} />
    );
}