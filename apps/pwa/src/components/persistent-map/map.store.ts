import { Point } from "./types";
import { makeAutoObservable } from "mobx";
import { IMapboxProvider } from "./providers/mapbox";

type MapStoreOptions = {
    points?: Point[];
};

export class MapStore{
    points: Point[];

    constructor(
        private readonly provider: IMapboxProvider,
        options?: MapStoreOptions,
    ) {
        makeAutoObservable(this);
        this.points = options?.points || [];
    }
}