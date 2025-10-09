import { createContext, RefObject, useContext } from "react";
import { BottomSheetControllersGroup } from "./types";

type BottomSheetGroupContextValue = {
    controllers: RefObject<BottomSheetControllersGroup>;
};

export const BottomSheetGroupContext = createContext<BottomSheetGroupContextValue | null>(null);

export function useBottomSheetGroupContext() {
    return useContext(BottomSheetGroupContext);
}