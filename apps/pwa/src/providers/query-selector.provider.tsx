"use client";

import { createContext, PropsWithChildren, RefObject, useContext, useEffect, useRef } from "react";

type QuerySelectorProviderValues = {
    main: RefObject<HTMLElement | null>
};

const QuerySelectorContext = createContext<QuerySelectorProviderValues | null>(null);

export const QuerySelectorProvider = ({ children }: PropsWithChildren) => {
    const main = useRef<HTMLElement | null>(null);

    useEffect(() => {
        main.current = document.getElementById("main");
    }, []);

    return (
        <QuerySelectorContext.Provider value={{ main }}>
            { children }
        </QuerySelectorContext.Provider>
    );
};

export function useQuerySelectorContext() {
    const ctx = useContext(QuerySelectorContext);
    if(!ctx) {
        throw new Error("useQuerySelectorContext must be used within <QuerySelectorProvider />");
    }
    return ctx;
}