import { MetadataRoute } from "next";
import { getAllEvents } from "@/api/event";
import { API_URL, BASE_URL } from "@/auth.config";

const rootRoute = "/discover";
const staticRoutes = [
    "/discover/randomized",
    "/discover/highlights",
];

const lastModified = new Date("2025-09-30");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data: events } = await getAllEvents({
        baseURL: API_URL,
        fallback: [],
    });

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