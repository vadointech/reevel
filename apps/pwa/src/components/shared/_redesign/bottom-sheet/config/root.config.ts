import { initStore } from "@/lib/mobx";

export interface IBottomSheetRootConfig {
    snapPoints: number[];
    fitContent?: boolean;
    defaultSnapPointIndex: number;
    overlay: boolean;
    fadeThreshold: number;
    dismissible?: boolean;
    handleOnly?: boolean;
}

export class BottomSheetRootConfig implements IBottomSheetRootConfig {
    snapPoints: number[] = [.97];
    fitContent: boolean = false;
    defaultSnapPointIndex: number = 0;
    overlay: boolean = true;
    fadeThreshold: number = .5;
    dismissible: boolean = true;
    handleOnly: boolean = false;

    constructor(init: Partial<IBottomSheetRootConfig>) {
        initStore(this, init);
    }
}