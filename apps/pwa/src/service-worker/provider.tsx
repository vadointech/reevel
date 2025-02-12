"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import registerServiceWorker from "./registration";

type ServiceWorkerContextValue = {
    registration: ServiceWorkerRegistration | null;
};

const ServiceWorkerContext = createContext<ServiceWorkerContextValue | null>(null);

export const ServiceWorkerProvider = ({ children }: PropsWithChildren) => {
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    useEffect(() => {
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