import { initStore } from "@/lib/mobx";

type SnapPoint = number | "fit-content";

export interface IBottomSheetRootConfig {
    snapPoints: SnapPoint[];
    defaultOpen?: boolean;
    defaultSnapPointIndex: number;
    overlay: boolean;
    fadeThreshold: number;
    dismissible?: boolean;
    handleOnly?: boolean;
    touchEvents?: boolean;
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

    constructor(init: Partial<IBottomSheetRootConfig>) {
        initStore(this, init);
    }
}