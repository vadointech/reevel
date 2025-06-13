import { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { PersistentMapProvider } from "@/components/shared/map";
import { getSession } from "@/api/auth";
import { SessionStoreProvider } from "@/features/session";

export default async function MainLayout({ children }: PropsWithChildren) {

    const { data: user } = await getSession({
        nextHeaders: await headers(),
    });

    const location = user?.profile.location;

    return (
        <SessionStoreProvider
            init={[{ user }]}
        >
            <PersistentMapProvider
                accessToken={process.env.MAPBOX_ACESS_TOKEN || ""}
                mapStyleDark={process.env.MAPBOX_MAP_STYLE_DARK || ""}
                mapStyleLight={process.env.MAPBOX_MAP_STYLE_LIGHT || ""}
                viewState={{
                    center: location?.center.coordinates,
                    bboxPolygon: location?.bbox.coordinates,
                    zoom: 12,
                    pitch: 0,
                }}
            >
                {children}
            </PersistentMapProvider>
        </SessionStoreProvider>
    );
}