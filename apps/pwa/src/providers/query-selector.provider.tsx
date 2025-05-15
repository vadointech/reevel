"use client";

import { createContext, PropsWithChildren, RefObject, useContext, useEffect, useRef } from "react";

type QuerySelectorProviderValues = {
    main: RefObject<HTMLElement | null>;
    modal: RefObject<HTMLElement | null>;
};

const QuerySelectorContext = createContext<QuerySelectorProviderValues | null>(null);

export const QuerySelectorProvider = ({ children }: PropsWithChildren) => {
    const main = useRef<HTMLElement | null>(null);
    const modal = useRef<HTMLElement | null>(null);

    useEffect(() => {
        main.current = document.getElementById("main");
        modal.current = document.getElementById("modal-root");
    }, []);

    return (
        <QuerySelectorContext.Provider value={{ main, modal }}>
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