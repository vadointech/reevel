import { MetadataRoute } from "next";
import { getHighlights } from "@/api/discover";
import { paginationPlaceholder } from "@/entities/placeholders";
import { getDefaultCity } from "@/api/discover/server";
import { EventEntity } from "@/entities/event";
import { BASE_URL } from "@/config/env.config";

const rootRoute = "/discover";
const staticRoutes = [
    "/discover/randomized",
    "/discover/highlights",
];

const lastModified = new Date("2025-09-30");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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


    const staticUrls = staticRoutes.map(route => ({
        url: `${BASE_URL}${route}`,
        lastModified: lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    const eventUrls = events.map(event => ({
        url: `${BASE_URL}/discover/event/${event.id}`,
        lastModified: new Date(event.updatedAt || event.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: `${BASE_URL}${rootRoute}`,
            lastModified: lastModified,
            changeFrequency: "weekly" as const,
            priority: 1,
        },
        ...staticUrls,
        ...eventUrls,
    ];
}