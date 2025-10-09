"use client";

import { createContext, useContext } from "react";
import { IBottomSheetRootController, IBottomSheetStore } from "./types";

export type BottomSheetInstance = {
    store: IBottomSheetStore;
    controller: IBottomSheetRootController;
};

export const BottomSheetContext = createContext<BottomSheetInstance | null>(null);

export function useBottomSheet() {
    const ctx = useContext(BottomSheetContext);
    if (!ctx) {
        throw new Error("useBottomSheet must be used within <BottomSheetProvider />");
    }

    return ctx;
}