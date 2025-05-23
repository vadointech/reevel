import { action, makeObservable, observable, reaction } from "mobx";
import { DragControls } from "motion/react";
import { createMobxStoreProvider } from "@/lib/mobx";
import { BottomSheetRootConfig } from "./config/root.config";

export interface IBottomSheetStore {
    open: boolean;
    activeSnapPoint: number;
    setActiveSnapPoint(snapPoint: number): void;
    setOpen(): void;
    setClose(): void;
}

class BottomSheetStore implements IBottomSheetStore {
    open = false;
    activeSnapPoint: number = 0;

    readonly dragControls: DragControls;

    constructor(
        readonly rootConfig: BottomSheetRootConfig,
    ) {
        makeObservable(this, {
            open: observable,
            activeSnapPoint: observable,
            setOpen: action,
            setClose: action,
            setActiveSnapPoint: action,
            setOpenState: action,
        });

        this.open = rootConfig.defaultOpen;
        this.activeSnapPoint = rootConfig.defaultSnapPointIndex;
        this.dragControls = new DragControls();

        if(rootConfig.externalControls.storeControls) {
            rootConfig.externalControls.storeControls.current = this;
        }

        reaction(
            () => this.activeSnapPoint,
            (snapPoint) => {
                this.rootConfig.onSnapPointChange(snapPoint);
            },
        );
    }

    setOpen() {
        this.open = true;
    }

    setClose() {
        this.open = false;
        this.rootConfig.onClose();
    }

    setOpenState(state: boolean) {
        this.open = state;
    }

    setActiveSnapPoint(snapPoint: number) {
        this.activeSnapPoint = snapPoint;
    }
}

export const [BottomSheetStoreProvider, useBottomSheetStore] = createMobxStoreProvider(BottomSheetStore);