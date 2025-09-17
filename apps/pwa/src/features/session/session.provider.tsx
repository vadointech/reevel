"use client";

import { PropsWithChildren, useEffect } from "react";
import { useMobxStore } from "@/lib/mobx";
import { useSingleton } from "@/hooks";

import { fetcherClient } from "@/api/client";

import { SessionStore } from "./session.store";
import { SessionController } from "./session.controller";
import { SessionContext } from "./session.context";

import { useRouter } from "@/i18n/routing";
import { refreshSessionAction } from "./actions";

import { SessionStoreInit } from "./types";

export namespace SessionProvider {
    export type Props =  PropsWithChildren<SessionStoreInit>;
}

export const SessionProvider = ({
    children,
    ...initStore
}: SessionProvider.Props) => {
    const router = useRouter();
    const store = useMobxStore(SessionStore, initStore);
    const controller = useSingleton(SessionController, store);

    useEffect(() => {
        fetcherClient.interceptor.response(async(response) => {
            if(response.status === 401) {
                const actionResponse = await refreshSessionAction();
                if(!actionResponse.ok) {
                    router.replace("/login");
                }
            }
            return response;
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
