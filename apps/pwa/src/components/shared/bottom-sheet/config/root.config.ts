import { initStore } from "@/lib/mobx";
import { IBottomSheetConfigParams, IBottomSheetInternalConfig } from "../types";

export class BottomSheetRootConfig implements IBottomSheetInternalConfig {
    clientHeight: number = 0;
    contentHeight: number = 0;
    snapPoints: number[] = [.97];
    snapPointsCount: number;

    defaultOpen: boolean = false;
    defaultSnapPointIndex: number = 0;
    overlay: boolean = true;
    fadeThreshold: number = .5;
    dismissible: boolean = true;
    handleOnly: boolean = false;
    dragListener: boolean = true;
    touchEvents: boolean = false;

    onClose: undefined;
    onSnapPointChange: undefined;

    constructor(init: Partial<IBottomSheetConfigParams>) {
        initStore(this, init);
        this.snapPointsCount = this.snapPoints.length;
        if(typeof window !== "undefined") {
            this.clientHeight = window.innerHeight;
        }

        if(init.handleOnly) {
            this.dragListener = false;
        }
    }
}