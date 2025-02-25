"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import registerServiceWorker from "./registration";

type ServiceWorkerContextValue = {
    registration: ServiceWorkerRegistration | null;
};

const ServiceWorkerContext = createContext<ServiceWorkerContextValue | null>(null);

export namespace ServiceWorkerProvider {
    export type Props = {
        children: ReactNode;
        register?: boolean
    };
}

export const ServiceWorkerProvider = ({
    register = false,
    children,
}: ServiceWorkerProvider.Props) => {
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    useEffect(() => {
        if(!register) return;
        if("serviceWorker" in navigator) {
            (async() => {
                const registration = await registerServiceWorker();
                setRegistration(registration);
            })();
        }
    }, []);

    return (
        <ServiceWorkerContext.Provider value={{ registration }}>
            { children }
        </ServiceWorkerContext.Provider>
    );
};


export function useServiceWorker(): ServiceWorkerContextValue {
    const ctx = useContext(ServiceWorkerContext);
    if(!ctx) {
        throw new Error("useServiceWorkerContext must be used within <ServiceWorkerProvider />");
    }

    return ctx;
}