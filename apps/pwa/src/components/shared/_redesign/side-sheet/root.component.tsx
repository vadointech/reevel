"use client";

import { PropsWithChildren } from "react";

import { SideSheetStoreProvider } from "./store";

export namespace SideSheetRoot {
    export type Props = PropsWithChildren;
}

export const SideSheetRoot = ({ children }: SideSheetRoot.Props) => {
    return (
        <SideSheetStoreProvider init={[]}>
            { children }
        </SideSheetStoreProvider>
    );
};
