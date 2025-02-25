"use client";

import { PropsWithChildren } from "react";
import { ServiceWorkerProvider } from "@/service-worker/provider";

export const RootProviders = ({ children }: PropsWithChildren) => {
    return (
        <ServiceWorkerProvider>
            { children }
        </ServiceWorkerProvider>
    );
};