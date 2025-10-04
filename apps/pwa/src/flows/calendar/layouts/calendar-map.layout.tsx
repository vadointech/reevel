import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetCityHighlightsQueryBuilder } from "@/features/discover/queries";
import { MapView } from "@/components/shared/map";
import { PropsWithChildren } from "react";
import { eventEntityMapper } from "@/entities/event/mapper";

export namespace CalendarMapLayout {
    export type Props = PropsWithChildren;
}

export async function CalendarMapViewLayout({ children }: CalendarMapLayout.Props) {
    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    const events = await GetCityHighlightsQueryBuilder.queryFunc({
        center,
        radius,
    });
    const points = eventEntityMapper.toEventPoint(events);

    return (
        <>
            <MapView
                viewState={{
                    padding: {
                        bottom: 260,
                    },
                }}
                points={points}
            />
            { children }
        </>
    );
}
