import { AnimationControls, BoundingBox, DragControls, PanInfo } from "motion/react";
import { BottomSheetSnapPointController } from "./snap-point.controller";

import {
    IBottomSheetInternalConfig,
    IBottomSheetRootController,
    IBottomSheetStore,
    IBottomSheetSnapPointController,
} from "../types";

export class BottomSheetRootController implements IBottomSheetRootController {
    private readonly _dragControls: DragControls;
    private readonly _internalConfig: IBottomSheetInternalConfig;

    private snapPointController: IBottomSheetSnapPointController;

    constructor(
        rootConfig: IBottomSheetInternalConfig,
        private readonly store: IBottomSheetStore,
        private readonly _animationControls: AnimationControls,
    ) {
        this._internalConfig = rootConfig;
        this._dragControls = new DragControls();
        this.snapPointController = new BottomSheetSnapPointController(rootConfig);
    }

    get internalConfig(): IBottomSheetInternalConfig {
        return this._internalConfig;
    }
    get dragControls(): DragControls {
        return this._dragControls;
    }
    get animationControls(): AnimationControls {
        return this._animationControls;
    }
    get dragConstraints(): BoundingBox {
        return {
            top: this.snapPointController.boundTop,
            bottom: this.snapPointController.boundBottom,
            left: 0, right: 0,
        };
    }

    attach(container: HTMLElement | null) {
        if(container) {
            this._internalConfig.contentHeight = window.innerHeight - container.clientHeight;
            this.snapPointController = new BottomSheetSnapPointController(this._internalConfig);
        }
    }

    open() {
        this.store.setOpen(true);
        this.setPositionBySnapIndex(this._internalConfig.defaultSnapPointIndex);
    }

    close() {
        this.store.setOpen(false);
        this._internalConfig.onClose();
    }

    setSnapPoint(index:number) {
        this.store.setActiveSnapPoint(index);
    }

    drag(info: PanInfo) {
        const velocity = info.velocity.y;
        const position = info.offset.y;

        const currentSnapPointIndex = this.store.activeSnapPoint;
        const lastSnapPointIndex = this._internalConfig.snapPointsCount - 1;
        const isAtBottom = currentSnapPointIndex === lastSnapPointIndex;

        if (velocity >= 30 && isAtBottom) {
            if(this._internalConfig.dismissible) {
                this.close();
            }
            return;
        }

        const snapIndex = this.snapPointController.determineSnapPointIndex(
            currentSnapPointIndex,
            velocity,
            position,
        );

        this.setPositionBySnapIndex(snapIndex);
    }

    setPositionBySnapIndex(index: number) {
        const y = this.snapPointController.getPositionPxByIndex(index);
        if(y === this.store.positionPx) return;
        this.setSnapPoint(index);
        this.animationControls.start({ y });
    };
}