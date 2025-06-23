import { action, makeObservable, observable } from "mobx";
import { IBottomSheetInternalConfig, IBottomSheetStore } from "./types";

export class BottomSheetStore implements IBottomSheetStore {
    positionPx = 0;

    open = false;
    activeSnapPoint: number = 0;

    constructor(
        rootConfig: IBottomSheetInternalConfig,
    ) {
        makeObservable(this, {
            open: observable,
            activeSnapPoint: observable,

            setOpen: action,
            setActiveSnapPoint: action,
        });

        this.open = rootConfig.defaultOpen;
        this.activeSnapPoint = rootConfig.defaultSnapPointIndex;
    }

    setOpen(state: boolean) {
        this.open = state;
    }

    setActiveSnapPoint(snapPoint: number) {
        this.activeSnapPoint = snapPoint;
    }
}