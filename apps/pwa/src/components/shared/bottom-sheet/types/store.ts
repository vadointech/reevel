import { IMobxStore } from "@/lib/mobx";

export interface IBottomSheetStore extends IMobxStore {
    positionPx: number;

    open: boolean;
    activeSnapPoint: number;
    settledSnapPoint: number;

    setPositionPx(positionPx: number): void;

    setOpen(state: boolean): void;
    setActiveSnapPoint(index: number): void;
    setSettledSnapPoint(index: number): void;
}