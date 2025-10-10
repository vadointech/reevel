import { PropsWithChildren } from "react";
import { MapView } from "@/components/shared/map";
import { DiscoverProvider } from "@/features/discover";

export namespace DiscoverRootLayout {
    export type Props = PropsWithChildren;
}

export async function DiscoverRootLayout({ children }: DiscoverRootLayout.Props) {
    return (
        <DiscoverProvider>
            <MapView />
            { children }
        </DiscoverProvider>
    );
}
