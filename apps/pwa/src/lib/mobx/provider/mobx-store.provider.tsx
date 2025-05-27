import { createContext, PropsWithChildren, RefObject, useContext, useRef } from "react";

export function createMobxStoreProvider<Store extends object, Args extends unknown[]>(
    StoreClass: new (...args: Args) => Store,
) {
    const StoreContext = createContext<RefObject<Store> | null>(null);

    function StoreProvider({ children, init }: PropsWithChildren<{ init: Args }>) {
        const store = useRef(new StoreClass(...init));
        return (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        );
    }

    function useStoreContext() {
        const context = useContext(StoreContext);
        if (!context) {
            throw new Error("useStoreContext must be used within a StoreProvider");
        }
        return context;
    }

    return [StoreProvider, useStoreContext] as const;
}