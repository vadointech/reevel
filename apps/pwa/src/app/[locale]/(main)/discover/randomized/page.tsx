import { Metadata } from "next";
import { DiscoverRandomizedPage } from "@/flows/discover/pages";
import { defaultMetadata } from "@/metadata.config";

export function generateMetadata(): Metadata {
    const title =  "Random Events Near You | Reevel – Discover Fun Things To Do";
    const url = "/discover/randomized";

    return {
        title,
        description: "Not sure what to do tonight? Explore random events on Reevel – from live music and board games to casual hangouts. Find fun things to do and meet new people nearby.",
        alternates: {
            canonical: url,
        },
        openGraph: {
            ...defaultMetadata.openGraph,
            title,
            description:
              "Discover random events around you with Reevel. Join hangouts, explore activities, and meet people who share your interests.",
            url,
        },
        twitter: {
            ...defaultMetadata.twitter,
            title,
            description:  "Find random events near you – concerts, games, hangouts, and more. With Reevel, there's always something fun to do.",
        },
    };
}

export default function Page() {
    return <DiscoverRandomizedPage />;
}