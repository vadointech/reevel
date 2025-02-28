"use client";

import { createContext, ReactNode, RefObject, useContext, useEffect, useRef } from "react";
import { serviceWorkerService } from "@/lib/service-worker.service";

type ServiceWorkerContextValue = {
    registration: RefObject<ServiceWorkerRegistration | null>;
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
    const registration = useRef<ServiceWorkerRegistration | null>(null);
    useEffect(() => {
        if(!register) return;
        serviceWorkerService.register("/service-worker.js")
            .then(serviceWorker => registration.current = serviceWorker);
    }, []);

    useEffect(() => {
        if(!serviceWorkerService.serviceWorker) return;
        window.history.pushState = new Proxy(window.history.pushState, {
            apply: (
                target, // pushState
                thisArg, // this History
                argArray: [data: any, unused: string, url?: string | URL | null],
            ) => {
                const [, , url] = argArray;
                serviceWorkerService.postMessage({ type: "CACHE_ROUTE", payload: url });
                return target.apply(thisArg, argArray);
            },
        });

        window.history.replaceState = new Proxy(window.history.replaceState, {
            apply: (
                target, // replaceState
                thisArg, // this History
                argArray: [data: any, unused: string, url?: string | URL | null],
            ) => {
                const [, , url] = argArray;
                serviceWorkerService.postMessage({ type: "CACHE_ROUTE", payload: url });
                return target.apply(thisArg, argArray);
            },
        });
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