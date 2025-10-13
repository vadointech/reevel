import React, { RefObject } from "react";
import { ObjectUnique } from "@/utils/object";
import {
    BasePoint,
    IMapHandlers, IMapInitializationParams,
    IMapProvider,
    IMapRootController,
    IMapStore, ISelectPointParams,
    MapInternalConfig,
    Point,
} from "./types";
import { MAP_MOTION_TIMEOUT_MS } from "@/components/shared/map/map.config";

type Param = {

};

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
            params?: Partial<IMapInitializationParams>
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
                // this._store.setPoints(init.points);
            }

            if(init.handlers) {
                this.attachHandlers(init.handlers);
            }

            if(init.params?.resetViewStateOnMount) {
                new Promise((resolve) => setTimeout(resolve, MAP_MOTION_TIMEOUT_MS))
                    .then(() => {
                        this._provider.current.resetViewState();
                        this._store.setViewStateSynced(true);
                        this._externalHandlers.onMapReady?.(this._provider.current.internalConfig.viewState);
                    });
            } else {
                this._store.setViewStateSynced(true);
                this._externalHandlers.onMapReady?.(this._provider.current.internalConfig.viewState);
            }
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
            this._provider.current.resetViewState();
        }
    }

    selectPoint(pointId: string | null, params?: ISelectPointParams) {
        if(pointId === null) {
            this.unselectPoint();
        }

        if(pointId === this._store.selectedPoint) {
            this.unselectPoint();
        } else {
            if(params?.clearUnactive) {
                this._store.pointsRef = [...this._store.points];
                this.setPoints(
                    this._store.points.filter(
                        point => point.id === pointId,
                    ),
                );
            }
            this._store.setSelectedPoint(pointId);
            this._externalHandlers.onPointSelect?.(pointId);
        }
    }

    private unselectPoint() {
        this._store.setSelectedPoint(null);
        // await new Promise((resolve) => setTimeout(resolve, MAP_MOTION_TIMEOUT_MS));
        // this._store.setPoints(this._store.pointsRef);
        this._store.pointsRef = [];
        this._externalHandlers.onPointSelect?.(null);
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

    async replacePoints(points: Point<BasePoint>[], duration: number = MAP_MOTION_TIMEOUT_MS): Promise<void> {
        if(points.length === 0) return;

        this._store.setPointsVisible(false);

        await new Promise((resolve) => setTimeout(resolve, duration));
        this._store.setPoints([]);
        this._store.setPointsVisible(true);

        await new Promise((resolve) => setTimeout(resolve, duration));
        this._store.setPoints(points);
    }

    isPointOnMap(pointId: string): boolean {
        return this._store.points.some(point => point.id === pointId);
    }
}