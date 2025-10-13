"use client";

import { PropsWithChildren, useEffect } from "react";
import { useMobxStore } from "@/lib/mobx";
import { useSingleton } from "@/hooks";

import { SessionStore } from "./session.store";
import { SessionController } from "./session.controller";
import { SessionContext } from "./session.context";

import { SessionStoreInit } from "./types";
import { fetcherClient } from "@/api/client";

export namespace SessionProvider {
    export type Props =  PropsWithChildren<Partial<SessionStoreInit>>;
}

export const SessionProvider = ({
    children,
    ...initStore
}: SessionProvider.Props) => {
    const store = useMobxStore(SessionStore, initStore);
    const controller = useSingleton(SessionController, store);

    useEffect(() => {
        fetcherClient.interceptor.request((request) => {
            request.authorization = {
                method: "Bearer",
                token: store.accessToken,
            };

            return request;
        });
    }, []);

    return (
        <SessionContext.Provider
            value={controller}
        >
            { children }
        </SessionContext.Provider>
    );
};
