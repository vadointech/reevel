import { Point } from "./types";
import { action, makeObservable, observable } from "mobx";
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
        makeObservable(this, {
            points: observable,
            setPoints: action,
        });

        this.points = options?.points || [];
    }

    setPoints(points: Point[]) {

    }
}