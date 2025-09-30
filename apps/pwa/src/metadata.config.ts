import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
    openGraph: {
        title: "Reevel – Find Local Events & Meet New People Near You",
        description: "Find local events and Meet New People Near You. Your next adventure is just a tap away on the Reevel map.",
        url: "https://www.reevel.com",
        siteName: "Reevel",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/assets/og_render.png",
                width: 1200,
                height: 630,
                alt: "Reevel Interactive Event Map",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Reevel – Find Local Events & Meet New People Near You",
        description: "Find local events and Meet New People Near You. Your next adventure is just a tap away on the Reevel map.",
        images: [
            {
                url: "/assets/og_render.png",
                width: 1200,
                height: 630,
                alt: "Reevel Interactive Event Map",
            },
        ],
    },
};