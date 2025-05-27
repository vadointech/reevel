import { PropsWithChildren } from "react";
import { PersistentMapProvider } from "@/components/shared/map";
import { getSession } from "@/api/auth/get-session";
import { headers } from "next/headers";

export default async function MainLayout({ children }: PropsWithChildren) {

    const { data } = await getSession({
        nextHeaders: await headers(),
    });

    const location = data?.profile.location;

    return (
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
    );
}