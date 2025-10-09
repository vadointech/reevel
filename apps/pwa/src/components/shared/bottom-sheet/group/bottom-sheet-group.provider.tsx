"use client";

import { PropsWithChildren, RefObject } from "react";
import { BottomSheetControllersGroup } from "./types";
import { BottomSheetGroupContext } from "./bottom-sheet-group.context";

export namespace BottomSheetGroupProvider {
    export type Props = PropsWithChildren<{
        controllers: RefObject<BottomSheetControllersGroup>;
    }>;
}

export const BottomSheetGroupProvider = ({
    children,
    controllers,
}: BottomSheetGroupProvider.Props) => {
    return (
        <BottomSheetGroupContext.Provider value={{ controllers }}>
            { children }
        </BottomSheetGroupContext.Provider>
    );
};