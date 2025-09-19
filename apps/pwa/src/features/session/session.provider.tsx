"use client";

import { PropsWithChildren } from "react";
import { useMobxStore } from "@/lib/mobx";
import { useSingleton } from "@/hooks";

import { SessionStore } from "./session.store";
import { SessionController } from "./session.controller";
import { SessionContext } from "./session.context";

import { SessionStoreInit } from "./types";

export namespace SessionProvider {
    export type Props =  PropsWithChildren<SessionStoreInit>;
}

export const SessionProvider = ({
    children,
    ...initStore
}: SessionProvider.Props) => {
    const store = useMobxStore(SessionStore, initStore);
    const controller = useSingleton(SessionController, store);

    return (
        <SessionContext.Provider
            value={controller}
        >
            { children }
        </SessionContext.Provider>
    );
};
