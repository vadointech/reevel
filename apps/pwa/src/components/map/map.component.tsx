"use client";

import { useCallback, useRef } from "react";
import MapboxGLMap, { MapEvent, MapRef, Marker, ViewState } from "react-map-gl/mapbox";
import Supercluster from "supercluster";
import { useMapbox, useMapCluster } from "./hooks";
import { ClusterMarker, EventMarker } from "./marker";
import { useMapStore } from "./api/stores/map-store.provider";
import { useMediaQuery } from "@uidotdev/usehooks";

import "mapbox-gl/dist/mapbox-gl.css";

import { mockGeoJsonData } from "./data.mock";

export namespace Map {
    export type Props = {
        points?: Supercluster.PointFeature<unknown>[]
        initialViewState?: Partial<ViewState>
    };
}

export const Map = ({
    points = mockGeoJsonData,
    initialViewState,
}: Map.Props) => {
    const ref = useRef<MapRef>(null);

    const mapStore = useMapStore();

    const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const {
        viewState,
        bounds,
        updateBounds,
        updateViewState,
    } = useMapbox(points, initialViewState);

    const {
        clusters,
        supercluster,
    } = useMapCluster(
        points,
        bounds,
        viewState.zoom || 0,
    );

    const handleLoad = useCallback((e: MapEvent) => {
        mapStore.initialize(ref);
        updateBounds(e);
    }, []);

    const handleZoomToCluster = useCallback((cluster: Supercluster.PointFeature<unknown>) => {
        if(!supercluster) return;

        const [longitude, latitude] = cluster.geometry.coordinates;
        const expansionZoom = supercluster.getClusterExpansionZoom(cluster.id as number);

        mapStore.flyTo([longitude, latitude], {
            speed: 2,
            zoom: Math.min(expansionZoom, 20),
        });
    }, [mapStore.mapRef]);

    const getClusterSize = useCallback((count: number, zoom: number = 12) => {
        return Math.min(30 + 5 * Math.cbrt(count) * (1 + (20 - zoom) / 10), 80);
    }, []);

    return (
        <MapboxGLMap
            {...viewState}
            maxZoom={20}
            ref={ref}
            mapStyle={isDarkMode ? mapStore.mapStyleDark : mapStore.mapStyleLight}
            mapboxAccessToken={mapStore.accessToken}
            onMove={(e) => {
                updateViewState(e);
                updateBounds(e);
            }}
            onLoad={handleLoad}
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            {
                clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;

                    const isCluster = cluster.properties?.cluster;
                    const pointCount = cluster.properties?.point_count || 0;
                    const clusterSize = getClusterSize(pointCount, viewState.zoom);

                    if(isCluster) {
                        return (
                            <Marker
                                key={`cluster-${cluster.id}`}
                                latitude={latitude}
                                longitude={longitude}
                                onClick={() => handleZoomToCluster(cluster)}
                            >
                                <ClusterMarker
                                    size={clusterSize}
                                >
                                    { pointCount }
                                </ClusterMarker>
                            </Marker>
                        );
                    }

                    return (
                        <Marker
                            key={`marker-${cluster.properties?.id}`}
                            longitude={longitude}
                            latitude={latitude}
                        >
                            <EventMarker point={[longitude, latitude]} />
                        </Marker>
                    );
                })
            }
        </MapboxGLMap>
    );
};