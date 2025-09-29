import { useEffect, useState } from "react";
import { IMobxStore } from "./types";

export function useMobxStore<Store extends IMobxStore, Args extends any[]>(StoreClass: new (...args: Args) => Store, ...args: Args) {
    const [store] = useState(() => new StoreClass(...args));

    useEffect(() => {
        return () => store.dispose();
    }, []);

    

    return store;
}

