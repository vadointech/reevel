import type { ReactNode } from "react";

export type WheelParams = {
    items: Array<string | number | ReactNode>;
    itemWidth: number;
    itemHeight: number;
};

export type WheelRef = {
    wheel: HTMLDivElement | null;
    wheelItem: Array<HTMLDivElement | null>;
};

export class Wheel {
    items: WheelParams["items"];
    itemWidth: WheelParams["itemWidth"];
    itemHeight: WheelParams["itemHeight"];
    itemCount: number;
    itemRadius: number;

    length: number;
    radius: number;

    constructor(params: WheelParams) {
        this.items = params.items;
        this.itemCount = this.items.length;
        this.itemWidth = params.itemWidth;
        this.itemHeight = params.itemHeight;

        this.itemRadius = 360 / this.itemCount;
        this.length = this.itemCount * this.itemWidth;
        this.radius = this.length / (2 * Math.PI);
    }
}