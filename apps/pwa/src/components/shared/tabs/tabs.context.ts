"use client";

import { createContext, useContext } from "react";
import { ITabsStore } from "./types";

type TabsContextValues = {
    store: ITabsStore;
};

export const TabsContext = createContext<TabsContextValues | null>(null);

export function useTabsContext() {
    const ctx = useContext(TabsContext);
    if (!ctx) {
        throw new Error("useTabsContext must be used within <TabsProvider />");
    }
    return ctx;
}