"use client";

import { PropsWithChildren } from "react";

export const StandaloneProvider = ({ children }: PropsWithChildren) => {
    const isStandalone = ("standalone" in window.navigator) && (window.navigator["standalone"]);

    if(isStandalone) return (
        <div className="standalone">
            { children }
        </div>
    );

    return children;
};
