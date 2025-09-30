"use client";

import { PropsWithChildren } from "react";
import { TabsContext } from "./tabs.context";
import { useMobxStore } from "@/lib/mobx";
import { TabsStore } from "@/components/shared/tabs/tabs.store";

export namespace TabsRoot {
    export type Props = PropsWithChildren & {
        defaultIndex?: number;
    };
}

export const TabsRoot = ({ defaultIndex, children }: TabsRoot.Props) => {
    const store = useMobxStore(TabsStore, {
        activeTabIndex: defaultIndex,
    });

    return (
        <TabsContext.Provider value={{ store }}>
            { children }
        </TabsContext.Provider>
    );
};