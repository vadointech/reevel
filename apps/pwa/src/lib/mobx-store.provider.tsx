"use client";

import { createContext, PropsWithChildren, useContext } from "react";

export function createMobxStore<Store extends object, Args extends unknown[]>(
    StoreClass: new (...args: Args) => Store,
) {
    const StoreContext = createContext<Store | null>(null);

    function StoreProvider({ children, init }: PropsWithChildren<{ init: Args }>) {
        const store = new StoreClass(...init);
        return (
            <StoreContext.Provider value={store}>
                { children }
            </StoreContext.Provider>
        );
    }

    const useStoreContext = () => {
        const context = useContext(StoreContext);
        if (!context) {
            throw new Error("useStoreContext must be used within a StoreProvider");
        }
        return context;
    };

    return [StoreProvider, useStoreContext] as const;
}