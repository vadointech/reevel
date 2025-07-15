import React, { RefObject } from "react";
import { ObjectUnique } from "@/utils/object";
import {
    BasePoint,
    IMapHandlers,
    IMapProvider,
    IMapRootController,
    IMapStore,
    MapInternalConfig,
    Point,
} from "./types";

export class MapRootController implements IMapRootController {
    _externalHandlers: Partial<IMapHandlers> = {};

    constructor(
        private readonly mapContainerRef: RefObject<HTMLElement | null>,
        private readonly persistentRootRef: RefObject<HTMLElement | null>,
        private readonly _provider: RefObject<IMapProvider>,
        private readonly _store: IMapStore,
    ) {}

    get externalHandlers(): Partial<IMapHandlers> {
        return this._externalHandlers;
    }

    attachMap(
        container: React.RefObject<HTMLElement | null>,
        init: Partial<{
            points: Point<BasePoint>[],
            viewState?: Partial<MapInternalConfig.IViewStateConfig>,
            handlers?: Partial<IMapHandlers>,
        }>,
    ) {
        if(this.mapContainerRef.current && container.current) {
            container.current.appendChild(this.mapContainerRef.current);

            if(init.viewState) {
                this._provider.current.resetViewState(init.viewState, {
                    animate: false,
                });

            }

            if(init.points) {
                this._store.setPoints(init.points);
            }

            if(init.handlers) {
                this.attachHandlers(init.handlers);
            }

            this.syncViewState(this._provider.current.internalConfig.viewState, true);
        }
    }

    attachHandlers(handlers: Partial<IMapHandlers>) {
        this._externalHandlers = handlers;
    }

    detachHandlers(handlers: Array<keyof IMapHandlers>) {
        handlers.forEach(handler => {
            delete this._externalHandlers[handler];
        });
    }

    detachMap() {
        if (this.mapContainerRef.current && this.persistentRootRef.current) {
            this.persistentRootRef.current.appendChild(this.mapContainerRef.current);

            this._externalHandlers.onMapDetach?.();

            this._externalHandlers = {};
            this._store.setPoints([]);
            this._provider.current.resetViewState(undefined, { animate: false });
        }
    }

    syncViewState(viewState: MapInternalConfig.IViewStateConfig, forceRefresh = false): void {
        if(viewState.zoom === this._provider.current.defaultConfig.viewState.zoom) return;

        if(forceRefresh) {
            this._provider.current.internalConfig.viewState = viewState;
            this._externalHandlers.onMapReady?.(viewState);
            return;
        }

        if(this._provider.current.internalConfig.viewState.zoom === this._provider.current.defaultConfig.viewState.zoom) {
            this._provider.current.internalConfig.viewState = viewState;
            this._externalHandlers.onMapReady?.(viewState);
        }
    }

    selectPoint(pointId: string | null) {
        if(pointId === this._store.selectedPoint) {
            this._store.setSelectedPoint(null);
            this._externalHandlers.onPointSelect?.(null);
        } else {
            this._store.setSelectedPoint(pointId);
            this._externalHandlers.onPointSelect?.(pointId);
        }
    }

    setPoints(points: Point<BasePoint>[]) {
        this._store.setPoints([
            ...new ObjectUnique(points, "id"),
        ]);
    }

    appendPoints(point: Point<BasePoint>[]) {
        if(point.length === 0) return;
        this._store.setPoints([
            ... new ObjectUnique(
                [
                    ...this._store.points,
                    ...point,
                ], "id",
            ),
        ]);
    }

    async replacePoints(points: Point<BasePoint>[], duration: number = 400): Promise<void> {
        this._store.setPointsVisible(false);

        await new Promise((resolve) => setTimeout(resolve, duration));
        this._store.setPoints([]);
        this._store.setPointsVisible(true);

        await new Promise((resolve) => setTimeout(resolve, duration));
        this._store.setPoints(points);
    }
}