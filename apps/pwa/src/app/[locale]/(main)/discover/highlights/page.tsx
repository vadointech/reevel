import { Metadata } from "next";
import { DiscoverHighlightsPage } from "@/flows/discover/pages";
import { defaultMetadata } from "@/config/metadata.config";
import { BASE_URL } from "@/config/env.config";

export function generateMetadata(): Metadata {
    const title =  "Highlights – Best Events in Your City | Reevel";
    const url = `${BASE_URL}/discover/highlights`;

    return {
        title,
        description: "Discover the best events happening in your city with Reevel Highlights. From concerts and festivals to casual hangouts – explore things to do near you today.",
        alternates: {
            canonical: url,
        },
        openGraph: {
            ...defaultMetadata.openGraph,
            title,
            description: "Find the top events and activities in your city with Reevel Highlights. Meet new people, join local hangouts, and never miss out on what's happening nearby.",
            url,
        },
        twitter: {
            ...defaultMetadata.twitter,
            title,
            description: "Check out the hottest events in your city with Reevel Highlights. Explore concerts, games, and local activities near you.",
        },
    };
}

export default function Page() {
    return <DiscoverHighlightsPage />;
}