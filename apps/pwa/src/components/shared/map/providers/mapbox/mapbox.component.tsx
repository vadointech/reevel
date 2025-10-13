"use client";

import { forwardRef, memo, RefObject } from "react";
import { observer } from "mobx-react-lite";
import MapboxGLMap, { MapRef, Marker } from "react-map-gl/mapbox";
import { useMapbox, useMapboxCluster } from "./hooks";
import { ClusterMarker, MapMarker } from "../../markers";
import { IMapProvider, IMapRootController, IMapStore, MapProviderCameraState } from "./types";

import "mapbox-gl/dist/mapbox-gl.css";

export namespace MapboxComponent {
    export type Props = {
        mapStyle: string;
        store: IMapStore;
        provider: RefObject<IMapProvider>;
        controller: RefObject<IMapRootController>;
        onMapLoad?: () => void;
    };
}

export const MapboxComponent = memo(forwardRef<MapRef, MapboxComponent.Props>(({
    mapStyle,
    store,
    provider,
    controller,
    onMapLoad,
}, ref) => {
    const {
        viewState,
        bounds,
        handleMapMove,
        handleMapMoveEnd,
        handleMapLoad,
        handleSelectPoint,
    } = useMapbox(
        provider,
        controller,
        onMapLoad,
    );

    return (
        <MapboxGLMap
            {...viewState}
            reuseMaps // This is a key prop for performance
            ref={ref}
            mapStyle={mapStyle}
            onMove={handleMapMove}
            onMoveEnd={handleMapMoveEnd}
            onLoad={handleMapLoad}
            initialViewState={provider.current.internalConfig.viewState}
            mapboxAccessToken={provider.current.internalConfig.accessToken}
            style={{ width: "100%", height: "100%" }}
        >
            <MapClusters
                store={store}
                provider={provider}
                viewState={viewState}
                bounds={bounds}
                handleSelectPoint={handleSelectPoint}
            />
        </MapboxGLMap>
    );
}));

const MapClusters = observer(({
    store,
    provider,
    viewState,
    bounds,
    handleSelectPoint,
}: {
    store: IMapStore;
    provider: RefObject<IMapProvider>;
    viewState: Partial<MapProviderCameraState.ViewState>
    bounds: MapProviderCameraState.Bounds;
    handleSelectPoint: (id: string) => void;
}) => {
    const {
        clusters,
        getClusterSize,
        handleZoomToCluster,
    } = useMapboxCluster(provider, {
        bounds,
        points: store.points,
        zoom: viewState.zoom || 10,
    });

    return (
        <>
            {
                clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const isCluster = cluster.properties.cluster;

                    if(isCluster) {
                        const pointCount = cluster.properties.point_count || 0;
                        const clusterSize = getClusterSize(pointCount, viewState.zoom);
                        const active = !store.selectedPoint && store.pointsVisible;

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

                    const pointId = cluster.properties.id;

                    const selected = store.selectedPoint === pointId;
                    const active = (!store.selectedPoint || selected) && store.pointsVisible;

                    return (
                        <Marker
                            key={`marker-${pointId}`}
                            longitude={longitude}
                            latitude={latitude}
                            onClick={() => handleSelectPoint(pointId)}
                            style={{
                                zIndex: selected ? 2 : 0,
                            }}
                        >
                            <MapMarker
                                point={cluster.properties}
                                selected={selected}
                                active={active}
                            />
                        </Marker>
                    );
                })
            }
        </>
    );
});