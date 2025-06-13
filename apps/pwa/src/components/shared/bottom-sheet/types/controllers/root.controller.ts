import { AnimationControls, BoundingBox, DragControls, PanInfo } from "motion/react";
import { IBottomSheetInternalConfig } from "../root-config";
import { IBottomSheetStore } from "@/components/shared/bottom-sheet/types";

export interface IBottomSheetRootControllerContext {
    triggerHandlers: boolean;
}

export interface IBottomSheetRootController {
    internalConfig: IBottomSheetInternalConfig;
    dragControls: DragControls;
    animationControls: AnimationControls;

    dragConstraints: BoundingBox

    store: IBottomSheetStore;

    attach(container: HTMLElement | null): void;

    open(): void;
    close(): void;
    setSnapPoint(index: number, ctx?: IBottomSheetRootControllerContext): void;
    setPositionBySnapIndex(index: number, ctx?: IBottomSheetRootControllerContext): void;

    drag(info: PanInfo): void;
}