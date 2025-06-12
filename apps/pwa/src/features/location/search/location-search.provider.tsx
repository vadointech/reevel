"use client";

import { ReactNode, useMemo } from "react";
import { LocationSearchStore } from "./location-search.store";
import { ILocationSearchStore, LocationSearchConfigParams } from "./types";
import { LocationSearchContext } from "@/features/location/search/location-search.context";

export namespace LocationSearchProvider {
    export type Props = Partial<ILocationSearchStore> & LocationSearchConfigParams & {
        children: ReactNode
    };
}

export const LocationSearchProvider = ({
    children,
    callbackUrl,
    confirmUrl,
    ...storeInit
}: LocationSearchProvider.Props) => {

    const store = useMemo(() => new LocationSearchStore(storeInit), []);

    return (
        <LocationSearchContext.Provider
            value={{
                store,
                config: {
                    callbackUrl,
                    confirmUrl,
                },
            }}
        >
            { children }
        </LocationSearchContext.Provider>
    );
};
