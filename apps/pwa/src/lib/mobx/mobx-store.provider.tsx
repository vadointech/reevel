import { Context, createContext, PropsWithChildren, useContext } from "react";

export function createMobxStore<Store extends object>(
    StoreClass: new () => Store,
) {
    const StoreContext = createContext<Store | null>(new StoreClass());

    const useStoreContext = withStoreContext(StoreContext);

    return [useStoreContext] as const;
}

export function createMobxStoreProvider<Store extends object, Args extends unknown[]>(
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

    const useStoreContext = withStoreContext(StoreContext);

    return [StoreProvider, useStoreContext] as const;
}

function withStoreContext<Store extends object>(StoreContext: Context<Store | null>) {
    function useStoreContext(): Store;
    function useStoreContext<T extends keyof Store>(selector: T): Store[T];
    function useStoreContext<T extends keyof Store>(selector?: T): Store | Store[T] {
        const context = useContext(StoreContext);
        if (!context) {
            throw new Error("useStoreContext must be used within a StoreProvider");
        }

        if(selector) {
            const value = context[selector];
            return typeof value === "function" ? value.bind(context) : value;
        }
        return context;
    }

    return useStoreContext;
}
