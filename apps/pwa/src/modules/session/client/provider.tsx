"use client";

import { ReactNode, useState } from "react";
import { SessionContext } from "@/modules/session/client/context";
import { GetSession } from "@/api/auth/get-session";

export namespace SessionProvider {
    export type Props = {
        session: Maybe<GetSession.TOutput>
        children: ReactNode
    };
}

export const SessionProvider = ({ children, session: sessionInit }: SessionProvider.Props) => {
    const [session, setSession] = useState<Maybe<GetSession.TOutput>>(sessionInit);
    return (
        <SessionContext.Provider value={{ session, setSession }}>
            { children }
        </SessionContext.Provider>
    );
};