import { DiscoverCollectionPage } from "@/flows/discover/pages";
import { PropsWithParams } from "@/types/common";

export default async function Page({ params }: PropsWithParams<{ slug: string }>) {
    const { slug } = await params;
    return <DiscoverCollectionPage collectionId={slug} />;
}