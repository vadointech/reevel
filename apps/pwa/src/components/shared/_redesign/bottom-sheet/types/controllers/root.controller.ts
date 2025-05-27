import { AnimationControls, BoundingBox, DragControls, PanInfo } from "motion/react";
import { IBottomSheetInternalConfig } from "../root-config";

export interface IBottomSheetRootController {
    internalConfig: IBottomSheetInternalConfig;
    dragControls: DragControls;
    animationControls: AnimationControls;

    dragConstraints: BoundingBox

    attach(container: HTMLElement | null): void;

    open(): void;
    close(): void;
    setSnapPoint(index: number): void;
    setPositionBySnapIndex(index: number): void;

    drag(info: PanInfo): void;
}