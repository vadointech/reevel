import { MetadataRoute } from "next";
import { getAllEvents } from "@/api/event";

const rootRoute = "/discover";
const staticRoutes = [
    "/discover/randomized",
    "/discover/highlights",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_URL;

    const { data: events } = await getAllEvents({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        fallback: [],
    });

    const staticUrls = staticRoutes.map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date("2025-09-17"),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    const eventUrls = events.map(event => ({
        url: `${baseUrl}/discover/event/${event.id}`,
        lastModified: new Date(event.updatedAt || event.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: `${baseUrl}${rootRoute}`,
            lastModified: new Date("2025-09-17"),
            changeFrequency: "weekly" as const,
            priority: 1,
        },
        ...staticUrls,
        ...eventUrls,
    ];
}