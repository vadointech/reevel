import { PropsWithChildren } from "react";
import { PersistentMapProvider } from "@/components/shared/map";
import { SessionProvider } from "@/features/session";
import { ThemeProvider } from "@/features/theme";
import { getSession } from "@/api/user/server";

export default async function MainLayout({ children }: PropsWithChildren) {
    const session = await getSession();

    const location = session?.profile?.location;

    return (
        <SessionProvider user={session}>
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
                {/* <BottomNavBar /> */}
            </ThemeProvider>
        </SessionProvider>
    );
}