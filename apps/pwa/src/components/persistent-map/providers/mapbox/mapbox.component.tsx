"use client";

import { forwardRef, memo, useCallback, useState } from "react";
import { MapboxEvent } from "mapbox-gl";
import MapboxGLMap, { MapRef, Marker, ViewState, ViewStateChangeEvent } from "react-map-gl/mapbox";
import { Bounds, useMapboxCluster } from "./hooks/use-mapbox-cluster";
import { observer } from "mobx-react-lite";
import { ClusterMarker, EventMarker } from "@/components/map/marker";
import { MapStore } from "@/components/persistent-map/map.store";
import { IMapProvider } from "@/components/persistent-map/providers/types";

import "mapbox-gl/dist/mapbox-gl.css";

export namespace MapboxComponent {
    export type Props = {
        store: MapStore;
        provider: IMapProvider;
        mapStyle?: string;
        mapboxAccessToken?: string;
        handleInitializeMap: (e: MapboxEvent) => void
        initialViewState?: Partial<ViewState>;
    };
}

export const MapboxComponent = memo(observer(forwardRef<MapRef, MapboxComponent.Props>(({
    store,
    provider,
    mapboxAccessToken,
    mapStyle,
    handleInitializeMap,
    initialViewState = {},
}, ref) => {
    const [viewState, setViewState] = useState<Partial<ViewState>>(initialViewState);
    const [bounds, setBounds] = useState<Bounds>([0, 0, 0, 0]);

    const updateViewState = (e: ViewStateChangeEvent) => {
        setViewState(e.viewState);
        updateBounds(e);
    };

    const updateBounds = useCallback((e: MapboxEvent) => {
        const bounds = e.target.getBounds();
        if(bounds) {
            setBounds(bounds.toArray().flat() as Bounds);
        }
    }, []);

    const handleLoad = useCallback((e: MapboxEvent) => {
        handleInitializeMap(e);
        updateBounds(e);
    }, []);

    const {
        clusters,
        getClusterSize,
        handleZoomToCluster,
    } = useMapboxCluster(provider, {
        bounds,
        points: store.points,
        zoom: viewState.zoom || 12,
    });

    return (
        <MapboxGLMap
            {...viewState}
            reuseMaps // This is a key prop for performance
            ref={ref}
            mapStyle={mapStyle}
            onMove={updateViewState}
            onLoad={handleLoad}
            initialViewState={initialViewState}
            mapboxAccessToken={mapboxAccessToken}
            style={{ width: "100%", height: "100%" }}
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
})));