import React, { RefObject } from "react";
import { ObjectUnique } from "@/utils/object-unique";
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
                this._externalHandlers = init.handlers;
            }

            this._externalHandlers.onMapReady?.();
        }
    }

    detachMap() {
        if (this.mapContainerRef.current && this.persistentRootRef.current) {
            this.persistentRootRef.current.appendChild(this.mapContainerRef.current);
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
        this._store.setPoints(points);
    }

    appendPoints(point: Point<BasePoint>[]) {
        this._store.setPoints([
            ... new ObjectUnique(
                [
                    ...this._store.points,
                    ...point,
                ], "id",
            ),
        ]);
    }

    async replacePoints(points: Point<BasePoint>[], duration: number = 500): Promise<void> {
        this._store.setPointsVisible(false);
        return new Promise((resolve) => setTimeout(() => {
            this._store.setPoints(points);
            this._store.setPointsVisible(true);
            resolve(undefined);
        }, duration));
    }
}