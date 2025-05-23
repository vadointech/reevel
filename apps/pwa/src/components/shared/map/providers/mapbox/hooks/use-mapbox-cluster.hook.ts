import { useCallback } from "react";
import useSupercluster from "use-supercluster";
import Supercluster, { PointFeature } from "supercluster";
import { IMapProvider } from "../../types";
import { MapProviderCameraState } from "@/components/shared/map/providers/types/camera";

type Options = {
    points: PointFeature<any>[],
    bounds: MapProviderCameraState.Bounds,
    zoom: number,
};

export function useMapboxClusterHook(provider: IMapProvider, args: Options) {
    const { clusters, supercluster } = useSupercluster({
        ...args,
        options: { radius: 40, maxZoom: 20 },
    });

    const getClusterSize = useCallback((count: number, zoom: number = 12) => {
        return Math.min(30 + 5 * Math.cbrt(count) * (1 + (20 - zoom) / 10), 80);
    }, []);

    const handleZoomToCluster = useCallback((cluster: Supercluster.PointFeature<unknown>) => {
        if(!supercluster) return;

        const [longitude, latitude] = cluster.geometry.coordinates;
        const expansionZoom = supercluster.getClusterExpansionZoom(cluster.id as number);

        provider.flyTo([longitude, latitude], {
            speed: 2,
            zoom: Math.min(expansionZoom, 20),
        });
    }, [supercluster, provider]);

    return {
        clusters,
        getClusterSize,
        handleZoomToCluster,
    };
}