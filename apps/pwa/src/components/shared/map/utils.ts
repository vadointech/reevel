import { MapInternalConfig } from "./types";
import { getSession } from "@/api/auth/get-session";
import { headers } from "next/headers";
import { MapProviderDefaultConfig, MapProviderInternalConfig } from "@/components/shared/map/map.config";

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