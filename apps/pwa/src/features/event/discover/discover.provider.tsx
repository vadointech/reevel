"use client";

import { PropsWithChildren, useMemo } from "react";
import { DiscoverContext } from "./discover.context";
import { DiscoverCollectionStore, DiscoverFiltersStore } from "./stores";

export namespace DiscoverProvider {
    export type Props = PropsWithChildren;
}

export const DiscoverProvider = ({
    children,
}: DiscoverProvider.Props) => {
    const filtersStore = useMemo(() => new DiscoverFiltersStore(), []);
    const collectionStore = useMemo(() => new DiscoverCollectionStore(), []);

    return (
        <DiscoverContext.Provider
            value={{
                filtersStore,
                collectionStore,
            }}
        >
            { children }
        </DiscoverContext.Provider>
    );
};
