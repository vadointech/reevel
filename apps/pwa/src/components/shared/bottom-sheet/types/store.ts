
export interface IBottomSheetStore {
    positionPx: number;

    open: boolean;
    activeSnapPoint: number;
    settledSnapPoint: number;

    setOpen(state: boolean): void;
    setActiveSnapPoint(index: number): void;
    setSettledSnapPoint(index: number): void;
}