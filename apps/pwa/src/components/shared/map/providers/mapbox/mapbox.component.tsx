"use client";

import { forwardRef, memo, RefObject, useEffect } from "react";
import { MapboxEvent } from "mapbox-gl";
import { observer } from "mobx-react-lite";
import MapboxGLMap, { MapRef, Marker, ViewState } from "react-map-gl/mapbox";
import {  useMapboxClusterHook } from "./hooks/use-mapbox-cluster.hook";
import { useMapbox } from "./hooks/use-mapbox.hook";
import { ClusterMarker, EventMarker } from "../../markers";
import { MapStore } from "../../map.store";
import { IMapHandlers, IMapProvider } from "../types";

import "mapbox-gl/dist/mapbox-gl.css";
import { reaction } from "mobx";

export namespace MapboxComponent {
    export type Props = {
        store: MapStore;
        provider: IMapProvider;
        mapStyle?: string;
        mapboxAccessToken?: string;
        handleInitializeMap: (e: MapboxEvent) => void
        initialViewState?: Partial<ViewState>;
        handlers: RefObject<Partial<IMapHandlers>>
    };
}

export const MapboxComponent = memo(observer(forwardRef<MapRef, MapboxComponent.Props>(({
    store,
    provider,
    handlers,
    mapboxAccessToken,
    mapStyle,
    handleInitializeMap,
    initialViewState = {},
}, ref) => {
    const {
        viewState,
        bounds,
        handleMapMove,
        handleMapLoad,
        handleSelectPoint,
    } = useMapbox({
        store,
        provider,
        initialViewState,
        handlers,
        onMapLoad: handleInitializeMap,
    });

    const {
        clusters,
        getClusterSize,
        handleZoomToCluster,
    } = useMapboxClusterHook(provider, {
        bounds,
        points: store.points,
        zoom: viewState.zoom || 12,
    });

    useEffect(() => {
        const disposer = reaction(
            () => store.selectedPoint,
            (value) => {
                handlers.current.onPointSelect?.(value);
            },
        );

        return () => {
            disposer();
        };
    }, [store, handlers]);

    return (
        <MapboxGLMap
            {...viewState}
            reuseMaps // This is a key prop for performance
            ref={ref}
            mapStyle={mapStyle}
            onMove={handleMapMove}
            onLoad={handleMapLoad}
            initialViewState={initialViewState}
            mapboxAccessToken={mapboxAccessToken}
            style={{ width: "100%", height: "100%" }}
        >
            {
                clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;

                    const isCluster = cluster.properties.cluster;
                    const pointCount = cluster.properties.point_count || 0;
                    const clusterSize = getClusterSize(pointCount, viewState.zoom);

                    const selected = store.selectedPoint === cluster.properties.id;
                    const active = (!store.selectedPoint || selected) && !store.pointsHidden;

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
                                    active={active}
                                >
                                    { pointCount }
                                </ClusterMarker>
                            </Marker>
                        );
                    }

                    return (
                        <Marker
                            key={`marker-${cluster.properties.id}`}
                            longitude={longitude}
                            latitude={latitude}
                            onClick={() => handleSelectPoint(cluster.properties.id)}
                            style={{
                                zIndex: selected ? 1 : 0,
                            }}
                        >
                            <EventMarker
                                point={cluster.properties}
                                selected={selected}
                                active={active}
                            />
                        </Marker>
                    );
                })
            }
        </MapboxGLMap>
    );
})));