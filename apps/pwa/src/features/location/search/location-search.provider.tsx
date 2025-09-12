"use client";

import { ReactNode, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { LocationSearchStore } from "./location-search.store";
import { LocationSearchContext } from "./location-search.context";

import { ILocationSearchStore, LocationSearchConfigParams } from "./types";
import { useMobxStore } from "@/lib/mobx";

export namespace LocationSearchProvider {
    export type Props = Partial<ILocationSearchStore> & LocationSearchConfigParams & {
        children: ReactNode;
        syncFormField?: string;
    };
}

export const LocationSearchProvider = ({
    children,
    callbackUrl,
    confirmUrl,
    syncFormField,
    ...storeInit
}: LocationSearchProvider.Props) => {
    const form = useFormContext();
    const locationSearchStoreInit: ConstructorParameters<typeof LocationSearchStore> = useMemo(() => {
        if(syncFormField) {
            storeInit.locationToConfirm = form.getValues(syncFormField);
            return [
                storeInit,
                (value) => {
                    if(syncFormField && form) {
                        form.setValue(syncFormField, value);
                    }
                },
            ];
        }

        return [storeInit];
    }, [syncFormField]);
    
    const store = useMobxStore(LocationSearchStore, ...locationSearchStoreInit);

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
