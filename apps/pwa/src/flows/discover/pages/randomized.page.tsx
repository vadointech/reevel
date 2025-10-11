import { DiscoverRandomizedScreen } from "@/components/screens/discover";
import { extractUniqueInterests } from "@/features/discover/utils";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { getRandomizedEvents } from "@/api/discover";

export namespace DiscoverRandomizedPage {
    export type Props = never;
}

export async function DiscoverRandomizedPage() {
    const { data: randomizedEvents } = await getRandomizedEvents({
        params: {},
        fallback: [],
    });

    const interests = extractUniqueInterests(randomizedEvents);

    return (
        <DiscoverRandomizedScreen
            events={randomizedEvents}
            interests={interests}
            collection={DiscoverStaticCollections.Randomize}
        />
    );
}
