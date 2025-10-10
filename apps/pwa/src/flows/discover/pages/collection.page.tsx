import { DiscoverCollectionScreen } from "@/components/screens/discover";
import { DiscoverStaticCollections } from "@/features/discover/config";

export namespace DiscoverCollectionPage {
    export type Props = {
        collectionId: string;
    };
}

export async function DiscoverCollectionPage({ collectionId }: DiscoverCollectionPage.Props) {
    return (
        <DiscoverCollectionScreen
            events={[]}
            interests={[]}
            collection={DiscoverStaticCollections.Root + `/${collectionId}`}
        >
            Discover
        </DiscoverCollectionScreen>
    );
}