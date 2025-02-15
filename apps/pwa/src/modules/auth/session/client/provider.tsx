"use client";

import { ReactNode, useState } from "react";
import { SessionContext } from "@/modules/auth/session/client/context";
import { ClientSession } from "@/types/session";

export namespace SessionProvider {
    export type Props = {
        session: ClientSession | null
        children: ReactNode
    };
}

export const SessionProvider = ({ children, session: sessionInit }: SessionProvider.Props) => {
    const [session, setSession] = useState<ClientSession | null>(sessionInit);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            { children }
        </SessionContext.Provider>
    );
};