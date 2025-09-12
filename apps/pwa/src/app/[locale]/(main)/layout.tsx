import { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { getSession } from "@/api/user";
import { PersistentMapProvider } from "@/components/shared/map";
import { SessionProvider } from "@/features/session";
import { ThemeProvider } from "@/features/theme";

export const dynamic = "force-dynamic";

export default async function MainLayout({ children }: PropsWithChildren) {

    const { data: user } = await getSession({
        nextHeaders: await headers(),
    });

    const location = user?.profile.location;

    return (
        <SessionProvider user={user}>
            <ThemeProvider>
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
            </ThemeProvider>
        </SessionProvider>
    );
}