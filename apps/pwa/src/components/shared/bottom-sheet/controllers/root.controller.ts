import { AnimationControls, BoundingBox, DragControls, PanInfo } from "motion/react";
import { BottomSheetSnapPointController } from "./snap-point.controller";

import {
    IBottomSheetInternalConfig,
    IBottomSheetRootController,
    IBottomSheetStore,
    IBottomSheetSnapPointController, IBottomSheetRootControllerContext,
} from "../types";
import {
    generateBottomSheetTransitionParams,
} from "@/components/shared/bottom-sheet/config/transition.config";

export class BottomSheetRootController implements IBottomSheetRootController {
    private readonly _dragControls: DragControls;
    private readonly _internalConfig: IBottomSheetInternalConfig;

    private snapPointController: IBottomSheetSnapPointController;

    constructor(
        rootConfig: IBottomSheetInternalConfig,
        private readonly _store: IBottomSheetStore,
        private readonly _animationControls: AnimationControls,
    ) {
        this._internalConfig = rootConfig;
        this._dragControls = new DragControls();
        this.snapPointController = new BottomSheetSnapPointController(rootConfig);
    }

    get internalConfig(): IBottomSheetInternalConfig {
        return this._internalConfig;
    }
    get store(): IBottomSheetStore {
        return this._store;
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
        this._store.setOpen(true);
        this.setPositionBySnapIndex(this._internalConfig.defaultSnapPointIndex);
    }

    close() {
        this._store.setOpen(false);
        this._internalConfig.onClose?.();
        this._store.setPositionPx(0);
        this._store.setActiveSnapPoint(0);
        this._store.setSettledSnapPoint(0);
    }

    closeAsync() {
        return new Promise<void>((resolve) => {
            try {
                const transition = generateBottomSheetTransitionParams(
                    0,
                    this._store.positionPx,
                    this.snapPointController.boundBottom,
                );

                this.close();

                if(transition.duration) {
                    setTimeout(resolve, transition.duration * 1000);
                } else {
                    resolve();
                }
            } catch {
                resolve();
            }
        });
    }

    settleSnapPoint() {
        this._store.setSettledSnapPoint(this._store.activeSnapPoint);
    }

    setSnapPoint(index: number, ctx?: IBottomSheetRootControllerContext) {
        this._store.setActiveSnapPoint(index);

        this.withContext(ctx, ctx => {
            if(ctx.triggerHandlers) {
                this._internalConfig.onSnapPointChange?.(index);
            }
        });
    }

    drag(info: PanInfo) {
        const velocity = info.velocity.y;
        const position = info.offset.y;

        const currentSnapPointIndex = this._store.activeSnapPoint;
        const lastSnapPointIndex = this._internalConfig.snapPointsCount - 1;
        const isAtBottom = currentSnapPointIndex === lastSnapPointIndex;

        if(velocity >= 30 && isAtBottom) {
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

        this.setPositionBySnapIndex(snapIndex, { triggerHandlers: true });
    }

    setPositionBySnapIndex(index: number, ctx?: IBottomSheetRootControllerContext) {
        if(index < 0 || index >= this._internalConfig.snapPointsCount) return;

        const y = this.snapPointController.getPositionPxByIndex(index);

        this.animationControls.start(
            { y },
            generateBottomSheetTransitionParams(
                y,
                this._store.positionPx,
                this.snapPointController.boundBottom,
            ),
        );

        this.setSnapPoint(index, ctx);
        this._store.setPositionPx(y);
    };

    private withContext(ctx: IBottomSheetRootControllerContext = { triggerHandlers: false }, callback: (ctx: IBottomSheetRootControllerContext) => void) {
        callback(ctx);
    }
}