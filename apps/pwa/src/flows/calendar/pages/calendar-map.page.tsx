import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetCityHighlightsQueryBuilder } from "@/features/discover/queries";
import { seedEventUsers } from "@/features/event/utils";
import { extractUniqueInterests } from "@/features/discover/utils";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { CalendarMapScreen } from "@/components/screens/calendar";

export namespace CalendarMapPage {
    export type Props = never;
}

export async function CalendarMapPage() {
    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    let cityHighlights = await GetCityHighlightsQueryBuilder.queryFunc({
        center,
        radius,
    });
    cityHighlights = seedEventUsers(cityHighlights);
    const interests = extractUniqueInterests(cityHighlights);

    return (
        <CalendarMapScreen
            events={cityHighlights}
            interests={interests}
            collection={DiscoverStaticCollections.Highlights}
        />
    );
}
