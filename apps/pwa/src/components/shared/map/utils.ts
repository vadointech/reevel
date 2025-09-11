import { headers } from "next/headers";
import { getSession } from "@/api/user";

import { MapProviderDefaultConfig, MapProviderInternalConfig } from "@/components/shared/map/map.config";

import { MapInternalConfig } from "./types";

export async function getUserMapInternalConfig(): Promise<MapInternalConfig.IInternalConfig> {
    const { data: session } = await getSession({
        nextHeaders: await headers(),
    });

    const location = session?.profile.location;

    return new MapProviderInternalConfig({
        ...MapProviderDefaultConfig,
        viewState: {
            ...MapProviderDefaultConfig.viewState,
            center: location?.center.coordinates,
            bboxPolygon: location?.bbox.coordinates,
        },
    });
}