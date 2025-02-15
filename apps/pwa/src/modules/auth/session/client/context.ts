"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { ClientSession } from "@/types/session";

export type SessionContextValue<Session = ClientSession | null> = {
    session: Session;
    setSession: Dispatch<SetStateAction<Session>>;
};

export const SessionContext = createContext<SessionContextValue | null>(null);