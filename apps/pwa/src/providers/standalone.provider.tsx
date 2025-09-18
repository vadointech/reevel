"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

const StandaloneContext = createContext<boolean | null>(null);

export const StandaloneProvider = ({ children }: PropsWithChildren) => {
    const [isStandalone] = useState(() => {
        if(typeof window === "undefined") {
            return false;
        }
        return ("standalone" in window.navigator) && (!!window.navigator["standalone"]);
    });

    return (
        <StandaloneContext.Provider value={isStandalone}>
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