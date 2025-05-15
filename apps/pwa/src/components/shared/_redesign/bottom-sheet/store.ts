import { action, makeObservable, observable } from "mobx";
import { DragControls } from "motion/react";
import { createMobxStoreProvider } from "@/lib/mobx";
import { BottomSheetSnapPointControl } from "./snap-controls";
import { BottomSheetRootConfig } from "./config/root.config";

interface IBottomSheetStore {
    open: boolean;
    activeSnapPoint: number;
}

class BottomSheetStore implements IBottomSheetStore {
    open = false;
    activeSnapPoint: number = 0;
    contentPosition: number = 0;

    readonly dragControls: DragControls;
    readonly snapControls: BottomSheetSnapPointControl;

    constructor(
        readonly rootConfig: BottomSheetRootConfig,
    ) {
        makeObservable(this, {
            open: observable,
            activeSnapPoint: observable,
            setOpen: action,
            setClose: action,
            setActiveSnapPoint: action,
            setContentPosition: action,
        });

        this.snapControls = new BottomSheetSnapPointControl(
            this.rootConfig,
            window.innerHeight,
        );
        this.dragControls = new DragControls();
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

    setContentPosition(height: number) {
        this.contentPosition = height;
    }
}

export const [BottomSheetStoreProvider, useBottomSheetStore] = createMobxStoreProvider(BottomSheetStore);