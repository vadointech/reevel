import { action, makeObservable, observable } from "mobx";
import { createMobxStoreProvider } from "@/lib/mobx";
import { BottomSheetSnapPointControl } from "./snap-controls";
import { IBottomSheetRootConfig } from "./config/root.config";

interface IBottomSheetStore {
    open: boolean;
    activeSnapPoint: number;
}

class BottomSheetStore implements IBottomSheetStore {
    open = false;
    activeSnapPoint: number = 0;

    readonly snapControls: BottomSheetSnapPointControl;

    constructor(
        readonly rootConfig: IBottomSheetRootConfig,
    ) {
        makeObservable(this, {
            open: observable,
            activeSnapPoint: observable,
            setOpen: action,
            setClose: action,
            setActiveSnapPoint: action,
        });

        this.snapControls = new BottomSheetSnapPointControl(
            this.rootConfig,
            window.innerHeight,
        );
    }

    setOpen() {
        this.activeSnapPoint = this.rootConfig.defaultSnapPointIndex;
        this.open = true;
    }

    setClose() {
        this.open = false;
    }

    setActiveSnapPoint(snapPoint: number) {
        this.activeSnapPoint = snapPoint;
    }
}

export const [BottomSheetStoreProvider, useBottomSheetStore] = createMobxStoreProvider(BottomSheetStore);