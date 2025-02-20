"use client";

import { ReactNode } from "react";
import { GetSession } from "@/api/auth/get-session";
import { sessionStore } from "@/stores/session.store";

export namespace SessionProvider {
    export type Props = {
        session: Maybe<GetSession.TOutput>
        children: ReactNode
    };
}

export const SessionProvider = ({ children, session: sessionInit }: SessionProvider.Props) => {
    sessionStore.init(sessionInit);
    return children;
};