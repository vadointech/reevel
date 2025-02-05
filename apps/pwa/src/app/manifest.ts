import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        scope: "/",
        id: "/?source=pwa",
        start_url: "/?source=pwa",

        display: "standalone",
        orientation: "landscape",

        short_name: "Reevel",
        name: "Reevel: Make every moment count",
        description: "Easily bring people together. Reevel turns simple moments into lasting memories.",

        icons: [
            {
                src: "/icons/icon_x192.png",
                type: "image/png",
                sizes: "192x192"
            },
            {
                src: "/icons/icon_x512.png",
                type: "image/png",
                sizes: "512x512"
            },
            {
                src: "/icons/icon_x1024.png",
                type: "image/png",
                sizes: "1024x1024"
            },
        ],

        shortcuts: [
            {
                name: "How's the weather today?",
                short_name: "Today",
                description: "View weather information for today",
                url: "/today?source=pwa",
                icons: [{ "src": "/icons/icon_x192.png", "sizes": "192x192" }]
            },
            {
                name: "How's the weather tomorrow?",
                short_name: "Tomorrow",
                description: "View weather information for tomorrow",
                url: "/tomorrow?source=pwa",
                icons: [{ "src": "/icons/icon_x192.png", "sizes": "192x192" }]
            }
        ],

        screenshots: [
            {
                src: "/icons/icon_x1024.png",
                type: "image/png",
                sizes: "1024x1024",
                form_factor: "narrow"
            },
            {
                src: "/icons/icon_x1024.png",
                type: "image/jpg",
                sizes: "1024x1024",
                form_factor: "wide"
            }
        ]
    };
}