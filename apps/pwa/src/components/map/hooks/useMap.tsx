import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { Point } from "mapbox-gl";
import { Mapbox } from "@/components/map/types";
import {data} from "./geo";
import { createRoot } from "react-dom/client";
import { Marker } from "@/components/ui/marker";

export function useMap() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapApi = useRef<Mapbox | null>(null);
    const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [zommedIn, setZommedIn] = useState(true);

    const initialize = useCallback((container: HTMLDivElement) => {
        mapboxgl.accessToken = "pk.eyJ1IjoicGV0cm9zaGNodXIiLCJhIjoiY203MGxpZ2lwMDJrOTJsczZyNDNwNGIxZCJ9.hO7JCWS9DDfGjyUKp8093Q";
        mapApi.current = new mapboxgl.Map({
            container,
            center: [28.468377628194958, 49.23188823685999],
            style: "mapbox://styles/petroshchur/cm70mf0qz01kp01s2f1updkd3",
            attributionControl: false,
            projection: "mercator",
            maxTileCacheSize: 10,
            minTileCacheSize: 0,
            zoom: 12,
            pitch: 45,
        });
    }, []);

    useEffect(() => {
        if(mapRef.current) {
            initialize(mapRef.current);
        }
    }, []);


    useEffect(() => {
        if(!mapApi.current) return;

        mapApi.current.on("load", () => {
            for(const feature of data.features) {
                if(!mapApi.current) continue;

                const markerDiv = document.createElement("div");
                const root = createRoot(markerDiv);
                root.render(
                    <Marker
                        ref={(e) => {
                            markerRefs.current.push(e);
                        }}
                    />,
                );

                new mapboxgl.Marker(markerDiv)
                    .setLngLat(feature.geometry.coordinates)
                    .addTo(mapApi.current);
            }
        });

        mapApi.current.on("zoom", () => {
            if(!mapApi.current) return;

            const zoom = mapApi.current.getZoom();

            if(zoom < 12.5) {
                for(const marker of markerRefs.current) {
                    if(!marker) continue;
                    // marker.style.width = "10px";
                    // marker.style.height = "10px";
                }
                // if(zommedIn) {
                //     setZommedIn(false);
                // }
            } else {
                // for(const marker of markerRefs.current) {
                //     if(!marker) continue;
                //
                //     marker.style.width = "30px";
                //     marker.style.height = "30px";
                // }
                // if(!zommedIn) {
                //     setZommedIn(true);
                // }
            }
        });

    }, []);

    return [mapRef] as const;
}