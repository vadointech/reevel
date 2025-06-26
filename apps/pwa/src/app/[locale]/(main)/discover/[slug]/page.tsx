import { DiscoverCollectionPage } from "@/flows/discover/pages";
import { PropsWithParams } from "@/types/common";

export default async function Page({ params }: PropsWithParams<{ slug: string }>) {
    const _p = await params;
    return <DiscoverCollectionPage />;
    // return <DiscoverCollectionPage collectionId={slug} callbackUrl={"/discover"} />;
}