"use client";

import { PropsWithChildren } from "react";
import { TabsContext } from "./tabs.context";
import { useMobxStore } from "@/lib/mobx";
import { TabsStore } from "@/components/shared/tabs/tabs.store";
import { useSingleton } from "@/hooks";
import { TabsConfig } from "./tabs.config";
import { ITabsConfig } from "./types";

export namespace TabsRoot {
    export type Props = PropsWithChildren & Partial<ITabsConfig>;
}

export const TabsRoot = ({ children, ...configParams }: TabsRoot.Props) => {
    const config = useSingleton(TabsConfig, configParams);
    const store = useMobxStore(TabsStore, config);

    return (
        <TabsContext.Provider value={{ store, config }}>
            { children }
        </TabsContext.Provider>
    );
};