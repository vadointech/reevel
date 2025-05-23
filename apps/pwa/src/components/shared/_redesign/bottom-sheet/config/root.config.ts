import { initStore } from "@/lib/mobx";
import { BottomSheetSnapPoint } from "../controls";
import { IBottomSheetExternalControls, IBottomSheetHandlers } from "../types";

export interface IBottomSheetRootConfig extends IBottomSheetHandlers {
    snapPoints: BottomSheetSnapPoint[];
    defaultOpen?: boolean;
    defaultSnapPointIndex: number;
    overlay: boolean;
    fadeThreshold: number;
    dismissible?: boolean;
    handleOnly?: boolean;
    touchEvents?: boolean;

    externalControls?: Partial<IBottomSheetExternalControls>;
}

export class BottomSheetRootConfig implements IBottomSheetRootConfig {
    snapPoints: number[] = [.97];
    defaultOpen: boolean = false;
    defaultSnapPointIndex: number = 0;
    overlay: boolean = true;
    fadeThreshold: number = .5;
    dismissible: boolean = true;
    handleOnly: boolean = false;
    touchEvents: boolean = false;

    externalControls: Partial<IBottomSheetExternalControls> = {};

    onClose() {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSnapPointChange(snapPointIndex: number) {}

    constructor(init: Partial<IBottomSheetRootConfig>) {
        initStore(this, init);
    }
}