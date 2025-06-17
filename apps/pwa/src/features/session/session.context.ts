"use client";

import { createContext, useContext } from "react";
import { ISessionController } from "@/features/session/types";

export const SessionContext = createContext<ISessionController | null>(null);

export function useSessionContext() {
    const ctx = useContext(SessionContext);
    if (!ctx) throw new Error("useSessionContext must be used within a SessionProvider");
    return ctx;
}