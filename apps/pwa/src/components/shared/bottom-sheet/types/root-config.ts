import { IBottomSheetHandlers } from "./handlers";

export type BottomSheetSnapPoint = number | `${number}px` | "fit-content";

export enum BottomSheetDisplayMode {
    Standalone = "standalone",
    Browser = "browser",
}

export interface IBottomSheetConfigParams extends Partial<IBottomSheetHandlers> {
    snapPoints: BottomSheetSnapPoint[];
    defaultOpen: boolean;
    defaultSnapPointIndex: number;
    overlay: boolean;
    fadeThreshold: number;
    dismissible: boolean;
    handleOnly: boolean;
    touchEvents: boolean;
    dragListener: boolean | undefined;
    zIndex: number;
    displayMode: BottomSheetDisplayMode;
}

export interface IBottomSheetInternalConfig extends IBottomSheetConfigParams {
    clientHeight: number;
    contentHeight: number;
    snapPointsCount: number;
}