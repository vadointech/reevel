"use client";

import { useCallback } from "react";
import MapboxGLMap, { Marker, ViewState } from "react-map-gl/mapbox";
import Supercluster from "supercluster";
import { useMapContext } from "./context";
import { useMapApi } from "@/components/map/api";
import { useMapbox, useMapCluster } from "./hooks";

import "mapbox-gl/dist/mapbox-gl.css";

import { mockGeoJsonData } from "./data.mock";

export namespace Map {
    export type Props = {
        points?: Supercluster.PointFeature<any>[]
        initialViewState?: Partial<ViewState>
    };
}

export const Map = ({
    points = mockGeoJsonData,
    initialViewState,
}: Map.Props) => {
    const api = useMapApi();
    const { ref, mapStyle, accessToken } = useMapContext();

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

    const handleZoomToCluster = useCallback((cluster: Supercluster.PointFeature<any>) => {
        if(!supercluster) return;

        const [longitude, latitude] = cluster.geometry.coordinates;
        const expansionZoom = supercluster.getClusterExpansionZoom(cluster.id as number);

        api.flyTo([longitude, latitude], {
            speed: 2,
            zoom: Math.min(expansionZoom, 20),
        });
    }, [api]);

    return (
        <MapboxGLMap
            {...viewState}
            maxZoom={20}
            ref={ref}
            mapStyle={mapStyle}
            mapboxAccessToken={accessToken}
            onMove={(e) => {
                updateViewState(e);
                updateBounds(e);
            }}
            onLoad={updateBounds}
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

                    if(isCluster) {
                        return (
                            <Marker
                                key={`cluster-${cluster.id}`}
                                latitude={latitude}
                                longitude={longitude}
                                onClick={() => handleZoomToCluster(cluster)}
                            >
                                <div
                                    style={{
                                        width: `${10 + (pointCount / points.length) * 35}px`,
                                        height: `${10 + (pointCount / points.length) * 35}px`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "red",
                                        borderRadius: "50%",
                                    }}
                                >
                                    { pointCount }
                                </div>
                            </Marker>
                        );
                    }

                    return (
                        <Marker
                            key={`marker-${cluster.properties?.id}`}
                            longitude={longitude}
                            latitude={latitude}
                        />
                    );
                })
            }
        </MapboxGLMap>
    );
};