import { useEffect } from "react";
import { PositionControls } from "./use-bottom-sheet-position.hook";
import { BottomSheetBodyParams } from "./use-bottom-sheet-container.hook";

import { useBottomSheetStore } from "../store";

export type BottomSheetExternalStateParams = {
    open: boolean;
    activeSnap: number | "fit-content";
};

export function useBottomSheetExternalState(
    positionControls: PositionControls,
    bodyParams: BottomSheetBodyParams, {
        open,
        activeSnap,
    }: Partial<BottomSheetExternalStateParams> = {},
) {
    const bottomSheetStore = useBottomSheetStore();

    useEffect(() => {
        if(typeof open !== "undefined") {
            if(open) {
                bottomSheetStore.setOpen();
            } else {
                bottomSheetStore.setClose();
            }
        }
    }, [open]);

    useEffect(() => {
        if(!activeSnap) return;

        if(activeSnap === "fit-content") {
            positionControls.setPositionByPx(bodyParams.contentPosition.current);
        } else {
            positionControls.setPositionByRatio(activeSnap);
        }
    }, [activeSnap]);
}