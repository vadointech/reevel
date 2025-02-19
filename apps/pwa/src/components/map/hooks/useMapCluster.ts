"use client";

import useSupercluster from "use-supercluster";
import { PointFeature } from "supercluster";

type Bounds = [number, number, number, number];

export function useMapCluster(
    points: PointFeature<any>[],
    bounds: Bounds,
    zoom: number,
) {
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 40, maxZoom: 20 },
    });

    return {
        clusters,
        supercluster,
    };
}