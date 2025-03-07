import { PropsWithChildren } from "react";
import { PersistentMapProvider } from "@/components/map";

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <PersistentMapProvider
            mapAccessToken={process.env.MAPBOX_ACESS_TOKEN}
            mapStyleDark={process.env.MAPBOX_MAP_STYLE_DARK}
            mapStyleLight={process.env.MAPBOX_MAP_STYLE_LIGHT}
            initialViewState={{
                latitude: 49.23188823685999,
                longitude: 28.468377628194958,
                zoom: 12,
                pitch: 45,
            }}
        >
            { children }
        </PersistentMapProvider>
    );
}