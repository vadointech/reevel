"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { isStandalone } from "@/utils/display-mode";

const StandaloneContext = createContext<boolean | null>(null);

export const StandaloneProvider = ({ children }: PropsWithChildren) => {
    const [standalone] = useState(() => {
        if(typeof window === "undefined") {
            return false;
        }
        return isStandalone();
    });

    return (
        <StandaloneContext.Provider value={standalone}>
            { children }
        </StandaloneContext.Provider>
    );
};

export function useStandaloneContext() {
    const ctx = useContext(StandaloneContext);
    if(ctx === null) {
        throw new Error("useStandaloneContext must be used within <StandaloneProvider />");
    }
    return ctx;
}