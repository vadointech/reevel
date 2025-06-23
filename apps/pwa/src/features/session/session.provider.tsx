"use client";

import { ReactNode, useMemo } from "react";
import { SessionStore } from "./session.store";
import { SessionController } from "./session.controller";
import { SessionContext } from "./session.context";

import { ISessionStore } from "./types";

export namespace SessionProvider {
    export type Props = Partial<ISessionStore> & {
        children: ReactNode
    };
}

export const SessionProvider = ({
    children,
    ...initStore
}: SessionProvider.Props) => {
    const store = useMemo(() => new SessionStore(initStore), [initStore]);
    const controller = useMemo(() => new SessionController(store), [store]);

    return (
        <SessionContext.Provider
            value={controller}
        >
            { children }
        </SessionContext.Provider>
    );
};
