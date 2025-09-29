import { DiscoverCollectionPage } from "@/flows/discover/pages";
import { PropsWithParams } from "@/types/common";
import { Metadata } from "next";
import { capitalize } from "@/utils/capitalize";
import { defaultMetadata } from "@/metadata.config";
import { BASE_URL } from "@/auth.config";

export async function generateMetadata({ params }: PropsWithParams<{ slug: string }>): Promise<Metadata> {
    const { slug } = await params;
    const interestName = capitalize(slug.replace(/-/g, " "));

    const title = `${interestName} Events & Meetups Near You | Reevel`;
    const description = `Discover ${interestName} events and hangouts nearby. Join groups, meet new people, and explore fun activities with Reevel.`;
    const url = `${BASE_URL}/discover/${slug}`;

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
        },
        twitter: {
            ...defaultMetadata.twitter,
            title,
            description,
        },
    };
}

export default async function Page({ params }: PropsWithParams<{ slug: string }>) {
    const { slug } = await params;
    return <DiscoverCollectionPage collectionId={slug} />;
}