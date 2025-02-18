"use client";

import { useCallback, useRef, useState } from "react";
import useSupercluster from "use-supercluster";
import MapboxGLMap, {
    MapRef,
    MapProps,
    Marker,
    ViewState,
    MapEvent,
    ViewStateChangeEvent,
} from "react-map-gl/mapbox";
import { mockGeoJsonData } from "@/components/map/data.mock";

import "mapbox-gl/dist/mapbox-gl.css";

export namespace Map {
    export type Props = MapProps & {
        accessToken: string | undefined;
        mapStyle: string | undefined;
    };
    export type Bounds = [number, number, number, number];
}

const initialViewState = {
    latitude: 49.23188823685999,
    longitude: 28.468377628194958,
    zoom: 12,
    pitch: 45,
    width: "100%",
    height: "100%",
};

export const Map = ({
    accessToken,
    mapStyle,
    ...props
}: Map.Props) => {
    const [viewState, setViewState] = useState<Partial<ViewState>>(initialViewState);
    const [bounds, setBounds] = useState<Map.Bounds>([0, 0, 0, 0]);
    const mapRef = useRef<MapRef>(null);

    const onLoad = useCallback((e: MapEvent) => {
        const bnds = e.target.getBounds();
        if(bnds) {
            setBounds(bnds.toArray().flat() as Map.Bounds);
        }
    }, []);

    const onMove = useCallback((e: ViewStateChangeEvent) => {
        setViewState(e.viewState);
    }, []);

    const points = mockGeoJsonData;

    const { clusters } = useSupercluster({
        points,
        bounds,
        zoom: viewState.zoom || 0,
        options: { radius: 40, maxZoom: 20 },
    });

    return (
        <MapboxGLMap
            {...viewState}
            ref={mapRef}
            mapStyle={mapStyle}
            mapboxAccessToken={accessToken}
            onMove={onMove}
            onLoad={onLoad}
            {...props}
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
                                    {pointCount}
                                </div>
                            </Marker>
                        );
                    }

                    return (
                        <Marker
                            key={`marker-${cluster.properties?.id}`}
                            latitude={latitude}
                            longitude={longitude}
                        />
                    );
                })
            }
        </MapboxGLMap>
    );
};