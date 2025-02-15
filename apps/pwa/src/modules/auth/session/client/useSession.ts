"use client";

import { useContext } from "react";
import { SessionContext } from "./context";
import { ClientSession } from "@/types/session";
import { useRouter } from "@/i18n/routing";

export function useSession() {
    const ctx = useContext(SessionContext);

    const router = useRouter();

    if(!ctx) {
        throw new Error("useSessionContext must be used within a <SessionProvider />");
    }

    const { session, setSession } = ctx;

    const updateSession = (session: ClientSession) => {
        setSession(session);
    };

    updateSession.user = (user: Partial<ClientSession["user"]>) => {
        if(!session) return;
        setSession({
            ...session,
            user: {
                ...session.user,
                ...user,
            },
        });
    };

    const clearSession = () => {
        setSession(null);
        router.replace("/login");
    };

    return {
        session,
        clearSession,
        updateSession,
    };
}