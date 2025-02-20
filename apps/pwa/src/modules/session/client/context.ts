"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { GetSession } from "@/api/auth/get-session";

export type SessionContextValue<Session = Maybe<GetSession.TOutput>> = {
    session: Session;
    setSession: Dispatch<SetStateAction<Session>>;
};

export const SessionContext = createContext<SessionContextValue | null>(null);