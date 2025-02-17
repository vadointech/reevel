import { useCallback, useEffect, useRef } from "react";
import mapboxgl, { LngLatLike, MapOptions } from "mapbox-gl";
import { Mapbox, Position } from "../types";

import { MapController } from "../controllers";
import { Marker } from "@/components/ui/marker";
import { createRoot } from "react-dom/client";


interface MapboxHandlers {
    onLocationSelect?: (position: Position) => void
}

type UseMapParams = Omit<MapOptions, "container"> & {
    handlers?: MapboxHandlers,
};


const data: any = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    28.42009526821738,
                    49.21978684570328,
                ],
            },
            properties: {},
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [28.412681187828355, 49.226090388753505],
            },
            properties: {},
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [28.41130235675783, 49.22621694011241],
            },
            properties: {},
        },
    ],
};


export function useMap({
    ...params }: UseMapParams = {},
) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<Mapbox | null>(null);

    const initialize = useCallback((container: HTMLDivElement) => {
        if(mapRef.current) return;

        mapboxgl.accessToken = "pk.eyJ1IjoicGV0cm9zaGNodXIiLCJhIjoiY203MGxpZ2lwMDJrOTJsczZyNDNwNGIxZCJ9.hO7JCWS9DDfGjyUKp8093Q";
        mapRef.current = new mapboxgl.Map({
            container,
            center: [28.468377628194958, 49.23188823685999],
            style: "mapbox://styles/petroshchur/cm70mf0qz01kp01s2f1updkd3",
            attributionControl: false,
            projection: "mercator",
            maxTileCacheSize: 10,
            minTileCacheSize: 0,
            zoom: 12,
            pitch: 45,
            ...params,
        });
    }, []);

    useEffect(() => {
        if(mapContainerRef.current) {
            initialize(mapContainerRef.current);
        }
    }, [initialize]);

    useEffect(() => {
        if(!mapRef.current) return;

        mapRef.current.on("click", (e) => {
            console.log(e.lngLat);
        });

        mapRef.current.on("load", () => {
            if(!mapRef.current) return;

            mapRef.current.addSource("points", {
                type: "geojson",
                data: data,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
            });

            // Cluster circles
            mapRef.current.addLayer({
                id: "clusters",
                type: "circle",
                source: "points",
                filter: ["has", "point_count"],
                paint: {
                    "circle-color": "#FF5733",
                    "circle-radius": [
                        "step",
                        ["get", "point_count"],
                        20,
                        10,
                        30,
                        50,
                        40,
                    ],
                },
            });

            // Cluster count labels
            mapRef.current.addLayer({
                id: "cluster-count",
                type: "symbol",
                source: "points",
                filter: ["has", "point_count"],
                layout: {
                    "text-field": "{point_count_abbreviated}",
                    "text-font": ["Arial Unicode MS Bold"],
                    "text-size": 14,
                },
                paint: {
                    "text-color": "white",
                },
            });

            // Individual point layer
            mapRef.current.addLayer({
                id: "unclustered-point",
                type: "circle",
                source: "points",
                filter: ["!", ["has", "point_count"]],
                paint: {
                    "circle-color": "#007bff",
                    "circle-radius": 10,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffffff",
                },
            });

            const createCustomMarker = (lngLat) => {
                const markerDiv = document.createElement("div");
                markerDiv.style.width = "30px";
                markerDiv.style.height = "30px";
                markerDiv.style.borderRadius = "50%";
                markerDiv.style.backgroundColor = "blue";
                markerDiv.style.border = "3px solid white";
                markerDiv.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";

                return new mapboxgl.Marker(markerDiv).setLngLat(lngLat);
            };

            // Add custom markers
            const coordinates = [
                [30.5234, 50.4501],
                [30.5300, 50.4600],
                [30.5500, 50.4700],
                [30.5800, 50.4900],
                [30.6000, 50.5100],
            ];

            coordinates.forEach((coord) => {
                if(!mapRef.current) return;
                createCustomMarker(coord).addTo(mapRef.current);
            });

        });

        return () => {
            if(!mapRef.current) return;
            mapRef.current.remove();
        };
    }, []);

    return [
        mapContainerRef,
        new MapController(mapRef),
    ] as const;


    // if (clustered.has(`${lng}:${lat}`)) continue;

    // mapRef.current.on("zoom", () => {
    //     if (!mapRef.current) return;
    //
    //     for(const marker of markersRef.current) {
    //         if (!marker) continue;
    //
    //         const lng = Number(marker.dataset.lng);
    //         const lat = Number(marker.dataset.lat);
    //
    //         const proj = mapRef.current.project([lng, lat]);
    //
    //         for(const mkr of markersRef.current) {
    //             if (!mkr || marker === mkr) continue;
    //
    //             const mkrLng = Number(mkr.dataset.lng);
    //             const mkrLat = Number(mkr.dataset.lat);
    //
    //             const mkrProj = mapRef.current.project([mkrLng, mkrLat]);
    //
    //             const dx = proj.x - mkrProj.x;
    //             const dy = proj.y - mkrProj.y;
    //             const distance = Math.sqrt(dx * dx + dy * dy);
    //
    //
    //             if(distance < 40) {
    //
    //                 if(clustered.has(`${lng}:${lat}`) || clustered.has(`${mkrLng}:${mkrLat}`)) return;
    //
    //                 clustered.add(`${lng}:${lat}`);
    //                 clustered.add(`${mkrLng}:${mkrLat}`);
    //
    //                 marker.style.display = "none";
    //                 mkr.style.display = "none";
    //
    //
    //                 const clusterLng = (lng + mkrLng) / 2;
    //                 const clusterLat = (lat + mkrLat) / 2;
    //                 //
    //                 const cluster = document.createElement("div");
    //                 const root = createRoot(cluster);
    //                 root.render(
    //                     <Cluster
    //                         lng={clusterLng}
    //                         lat={clusterLat}
    //                         ref={(e) => {
    //                             markersRef.current.push(e);
    //                         }}
    //                     />,
    //                 );
    //
    //                 new mapboxgl.Marker(cluster)
    //                     .setLngLat([clusterLng, clusterLat])
    //                     .addTo(mapRef.current);
    //             } else {
    //                 clustered.delete(`${lng}:${lat}`);
    //                 clustered.delete(`${mkrLng}:${mkrLat}`);
    //
    //                 marker.style.display = "block";
    //                 mkr.style.display = "block";
    //             }
    //
    //         }
    //     }

    // for (const marker of markersRef.current) {
    //     if (!marker) continue;
    //
    //     const lng = Number(marker.dataset.lng);
    //     const lat = Number(marker.dataset.lat);
    //
    //     if (clustered.has(`${lng},${lat}`)) continue;
    //
    //     const proj = mapRef.current.project([lng, lat]);
    //
    //     for (const mkr of markersRef.current) {
    //         if (!mkr || marker === mkr) continue;
    //
    //         const mkrLng = Number(mkr.dataset.lng);
    //         const mkrLat = Number(mkr.dataset.lat);
    //
    //         if (clustered.has(`${mkrLng},${mkrLat}`)) continue;
    //
    //         const mkrProj = mapRef.current.project([mkrLng, mkrLat]);
    //
    //         const dx = proj.x - mkrProj.x;
    //         const dy = proj.y - mkrProj.y;
    //         const distance = Math.sqrt(dx * dx + dy * dy);
    //
    //         if (distance < 40) { // 10px + 30px (padding)
    //             clustered.add(`${lng},${lat}`);
    //             clustered.add(`${mkrLng},${mkrLat}`);
    //
    //             // 📌 Обчислюємо середні координати між двома точками
    //             const clusterLng = (lng + mkrLng) / 2;
    //             const clusterLat = (lat + mkrLat) / 2;
    //
    //             const cluster = document.createElement("div");
    //             const root = createRoot(cluster);
    //             root.render(<Cluster lng={clusterLng} lat={clusterLat} />);
    //
    //             marker.style.display = "none";
    //             mkr.style.display = "none";
    //
    //             new mapboxgl.Marker(cluster)
    //                 .setLngLat([clusterLng, clusterLat])
    //                 .addTo(mapRef.current);
    //         } else {
    //             marker.style.display = "block";
    //             mkr.style.display = "block";
    //         }
    //     }
    // }
    // });



    // mapRef.current.on("load", () => {
    //     if(!mapRef.current) return;
    //
    //     for(const p of data.features) {
    //         // if(!mapRef.current) continue;
    //         // const markerDiv = document.createElement("div");
    //         // const root = createRoot(markerDiv);
    //         //
    //         // const [lng, lat] = p.geometry.coordinates;
    //         //
    //         // root.render(
    //         //     <Marker
    //         //         key={lng}
    //         //         lng={lng}
    //         //         lat={lat}
    //         //         ref={(e) => {
    //         //             markersRef.current.push(e);
    //         //         }}
    //         //     />,
    //         // );
    //         //
    //         // new mapboxgl.Marker(markerDiv)
    //         //     .setLngLat(p.geometry.coordinates)
    //         //     .addTo(mapRef.current);
    //     }
    // });
}