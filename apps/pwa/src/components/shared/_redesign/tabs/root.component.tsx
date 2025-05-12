"use client";

import { PropsWithChildren } from "react";

import { TabsStoreProvider } from "./tabs.store";

export namespace TabsRoot {
    export type Props = PropsWithChildren & {
        defaultIndex?: number;
    };
}

export const TabsRoot = ({ defaultIndex, children }: TabsRoot.Props) => {
    return (
        <TabsStoreProvider init={[{ activeTabIndex: defaultIndex }]}>
            { children }
        </TabsStoreProvider>
    );
};
