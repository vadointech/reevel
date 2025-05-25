import React, { RefObject } from "react";
import { ObjectUnique } from "@/utils/object-unique";
import { MapStore } from "./map.store";
import {
    BasePoint,
    IMapHandlers,
    IMapProvider,
    IMapRootController,
    IMapStore,
    Point,
    MapProviderInitialViewState,
} from "./types";

export class MapRootController implements IMapRootController {

    private readonly _store: IMapStore;
    _externalHandlers: Partial<IMapHandlers> = {};

    constructor(
        private readonly mapContainerRef: RefObject<HTMLElement | null>,
        private readonly persistentRootRef: RefObject<HTMLElement | null>,
        private readonly _provider: RefObject<IMapProvider>,
    ) {
        this._store = new MapStore();
    }

    get store(): IMapStore {
        return this._store;
    }
    get externalHandlers(): Partial<IMapHandlers> {
        return this._externalHandlers;
    }

    attachMap(container: React.RefObject<HTMLElement | null>, viewState?: Partial<MapProviderInitialViewState>, handlers?: Partial<IMapHandlers>) {
        if(this.mapContainerRef.current && container.current) {
            container.current.appendChild(this.mapContainerRef.current);

            if(viewState) {
                this._provider.current.syncViewState(viewState, {
                    animate: false,
                });
            }

            if(handlers) {
                this._externalHandlers = handlers;
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