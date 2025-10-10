import { getCurrentUserInterests } from "@/api/user/server";
import { DiscoverScreen } from "@/components/screens/discover";
import { getEventCollectionsFeed } from "@/api/event/server";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { Navigation, NavigationRoutes } from "@/components/shared/navigation";

export namespace DiscoverPage {
    export type Props = never;
}

export async function DiscoverPage() {
    const interests = await getCurrentUserInterests();
    const collectionsInit = await getEventCollectionsFeed();

    return (
        <>
            <DiscoverScreen
                interestsInit={interests}
                collectionsInit={collectionsInit || []}
                cityHighlights={[]}
                collection={DiscoverStaticCollections.Root}
            />
            <Navigation currentPage={NavigationRoutes.Discover} />
        </>
    );
}
