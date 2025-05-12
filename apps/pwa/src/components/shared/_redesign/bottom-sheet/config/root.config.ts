import { initStore } from "@/lib/mobx";

export interface IBottomSheetRootConfig {
    snapPoints: number[];
    defaultSnapPointIndex: number;
    overlay: boolean;
    fadeThreshold: number;
    dismissible?: boolean;
}

export class BottomSheetRootConfig implements IBottomSheetRootConfig {
    snapPoints: number[] = [.97];
    defaultSnapPointIndex: number = 0;
    overlay: boolean = true;
    fadeThreshold: number = .5;
    dismissible: boolean = true;

    constructor(init: Partial<IBottomSheetRootConfig>) {
        initStore(this, init);
    }
}