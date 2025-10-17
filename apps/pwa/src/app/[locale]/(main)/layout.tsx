import { PropsWithChildren } from "react";
import { PersistentMapProvider } from "@/components/shared/map";
import { SessionProvider } from "@/features/session";
import { ThemeProvider } from "@/features/theme";
import { MapProviderDefaultConfig } from "@/components/shared/map/map.config";

export const dynamic = "force-static";

export default async function MainLayout({ children }: PropsWithChildren) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <PersistentMapProvider
                    accessToken={process.env.MAPBOX_ACESS_TOKEN || ""}
                    mapStyleDark={process.env.MAPBOX_MAP_STYLE_DARK || ""}
                    mapStyleLight={process.env.MAPBOX_MAP_STYLE_LIGHT || ""}
                    viewState={MapProviderDefaultConfig.viewState}
                >
                    { children }
                </PersistentMapProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}