"use client";

import { Map } from "@/components/map";
import { useMap } from "@/components/map/hooks";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Page() {
    const [ref] = useMap();

    return (
        <Map ref={ref} />
    );
}