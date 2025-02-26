import { createContext, PropsWithChildren, RefObject, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";

type MutateStore<Store> = (partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>)) => void;

export function createStoreProvider<
    Store,
    Provider extends keyof Store,
>(
    createStoreFn: (set: MutateStore<Store>) => Omit<Store, Provider>,
) {
    const Context = createContext<RefObject<StoreApi<Store>> | null>(null);

    function StoreProvider({ children, init }: PropsWithChildren<{ init: Pick<Store, Provider> }>) {
        const storeRef = useRef(
            createStore<Store>((set) => ({
                ...init,
                ...createStoreFn(set),
            } as Store)),
        );
        return (
            <Context.Provider value={storeRef}>
                { children }
            </Context.Provider>
        );
    }

    function useStoreProvider<S>(selector: (state: Store) => S) {
        const ctx = useContext(Context);
        if (!ctx) {
            throw new Error("useStoreProvider must be used within the context");
        }
        return useStore(ctx.current, selector);
    }

    return [StoreProvider, useStoreProvider] as const;
}
