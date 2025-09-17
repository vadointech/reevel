"use client";

import { PropsWithChildren } from "react";
import { DiscoverContext } from "./discover.context";
import { DiscoverStore } from "./discover.store";
import { useMobxStore } from "@/lib/mobx";

export namespace DiscoverProvider {
    export type Props = PropsWithChildren;
}

export const DiscoverProvider = ({
    children,
}: DiscoverProvider.Props) => {
    const store = useMobxStore(DiscoverStore);

    return (
        <DiscoverContext.Provider
            value={{ store }}
        >
            { children }
        </DiscoverContext.Provider>
    );
};
