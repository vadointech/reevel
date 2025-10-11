import { DiscoverScreen } from "@/components/screens/discover";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { Navigation, NavigationRoutes } from "@/components/shared/navigation";
import { eventsWithPaginationFallback, getCityHighlights, getInterestsFeed } from "@/api/discover";

export namespace DiscoverPage {
    export type Props = never;
}

export async function DiscoverPage() {
    const { data: interestsFeed } = await getInterestsFeed({
        fallback: [],
    });

    const { data: highlights } = await getCityHighlights({
        params: {},
        fallback: eventsWithPaginationFallback,
    });

    return (
        <>
            <DiscoverScreen
                interestsInit={interestsFeed}
                collectionsInit={interestsFeed}
                cityHighlights={highlights?.data}
                collection={DiscoverStaticCollections.Root}
            />
            <Navigation currentPage={NavigationRoutes.Discover} />
        </>
    );
}
