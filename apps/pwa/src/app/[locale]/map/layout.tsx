import { MapProvider } from "@/components/map/context";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <MapProvider
            accessToken={process.env.MAPBOX_ACESS_TOKEN}
            mapStyle={process.env.MAPBOX_MAP_STYLE}
        >
            { children }
        </MapProvider>
    );
}