"use client";

import { forwardRef, memo, RefObject } from "react";
import { observer } from "mobx-react-lite";
import MapboxGLMap, { MapRef, Marker } from "react-map-gl/mapbox";
import { useMapbox, useMapboxCluster } from "./hooks";
import { ClusterMarker, EventMarker } from "../../markers";
import { IMapProvider, IMapRootController } from "./types";

import "mapbox-gl/dist/mapbox-gl.css";

export namespace MapboxComponent {
    export type Props = {
        provider: RefObject<IMapProvider>
        controller: RefObject<IMapRootController>;
        onMapLoad?: () => void;
    };
}

export const MapboxComponent = memo(observer(forwardRef<MapRef, MapboxComponent.Props>(({
    provider,
    controller,
    onMapLoad,
}, ref) => {
    const {
        viewState,
        bounds,
        handleMapMove,
        handleMapLoad,
        handleSelectPoint,
    } = useMapbox(
        provider,
        controller,
        onMapLoad,
    );

    const {
        clusters,
        getClusterSize,
        handleZoomToCluster,
    } = useMapboxCluster(provider, {
        bounds,
        points: controller.current.store.points,
        zoom: viewState.zoom || 12,
    });

    return (
        <MapboxGLMap
            {...viewState}
            reuseMaps // This is a key prop for performance
            ref={ref}
            mapStyle={provider.current.config.mapStyleLight}
            onMove={handleMapMove}
            onLoad={handleMapLoad}
            initialViewState={provider.current.config.initialViewState}
            mapboxAccessToken={provider.current.config.accessToken}
            style={{ width: "100%", height: "100%" }}
        >
            {
                clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;

                    const isCluster = cluster.properties.cluster;
                    const pointCount = cluster.properties.point_count || 0;
                    const clusterSize = getClusterSize(pointCount, viewState.zoom);

                    const selected = controller.current.store.selectedPoint === cluster.properties.id;
                    const active = (!controller.current.store.selectedPoint || selected) && controller.current.store.pointsVisible;

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