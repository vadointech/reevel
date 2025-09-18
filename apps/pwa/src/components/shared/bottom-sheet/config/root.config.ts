import { initStore } from "@/lib/mobx";
import { BottomSheetDisplayMode, IBottomSheetConfigParams, IBottomSheetInternalConfig } from "../types";

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
    zIndex: number = 10;
    displayMode: BottomSheetDisplayMode = BottomSheetDisplayMode.Browser;

    onClose: undefined;
    onSnapPointChange: undefined;

    constructor(init: Partial<IBottomSheetConfigParams>) {
        initStore(this, init);
        this.snapPointsCount = this.snapPoints.length;

        if(typeof window !== "undefined") {
            this.clientHeight = BottomSheetRootConfig.getDynamicViewportHeight();
            this.displayMode = BottomSheetRootConfig.getDisplayMode();
        }

        if(init.handleOnly) {
            this.dragListener = false;
        }
    }

    static getDynamicViewportHeight() {
        if(typeof window === "undefined") {
            return 0;
        }

        const helperElement = document.createElement("div");

        helperElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 1px;
            height: 100dvh; /* Ось наша магія */
            pointer-events: none;
            visibility: hidden;
            z-index: -1;
        `;

        document.body.appendChild(helperElement);

        const dynamicHeight = helperElement.clientHeight;

        document.body.removeChild(helperElement);

        return dynamicHeight;
    }

    static getDisplayMode(): BottomSheetDisplayMode {
        const isStandalone = ("standalone" in window.navigator) && (!!window.navigator["standalone"]);
        return isStandalone ? BottomSheetDisplayMode.Standalone : BottomSheetDisplayMode.Browser;
    }
}