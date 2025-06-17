
export interface IBottomSheetStore {
    positionPx: number;

    open: boolean;
    activeSnapPoint: number;

    setOpen(state: boolean): void;
    setActiveSnapPoint(index: number): void;
}