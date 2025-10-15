"use client";

import { PropsWithChildren, useEffect } from "react";
import { useMobxStore } from "@/lib/mobx";
import { useSingleton } from "@/hooks";

import { SessionStore } from "./session.store";
import { SessionController } from "./session.controller";
import { SessionContext } from "./session.context";

export namespace SessionProvider {
    export type Props =  PropsWithChildren;
}

export const SessionProvider = ({
    children,
}: SessionProvider.Props) => {
    const store = useMobxStore(SessionStore);
    const controller = useSingleton(SessionController, store);

    useEffect(() => controller.initSession(), []);

    return (
        <SessionContext.Provider
            value={controller}
        >
            { children }
        </SessionContext.Provider>
    );
};
