"use client";

import { MapView } from "@/components/shared/map";
import { DiscoverDrawer } from "@/components/drawers/discover";

export namespace DiscoverPage {
    export type Props = never;
}

export function DiscoverPage() {
    return (
        <>
            <MapView />
            <DiscoverDrawer />
        </>
    );
}
