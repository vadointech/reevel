"use client";

import { createMobxStoreProvider } from "@/lib/mobx-store.provider";
import { SessionStore } from "./session.store";

export const [SessionStoreProvider, useSessionStore] = createMobxStoreProvider(SessionStore);