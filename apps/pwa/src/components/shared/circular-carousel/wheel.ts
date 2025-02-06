import { type ReactNode } from "react";

export type WheelSettings = {
    items: Array<string | number | ReactNode>;
    itemWidth: number;
    itemHeight: number;
}

export class Wheel {
    circleDegrees: number = 360;

    items: WheelSettings["items"];
    itemWidth: WheelSettings["itemWidth"];
    itemHeight: WheelSettings["itemHeight"];
    itemCount: number;
    itemRadius: number;

    length: number;
    radius: number;

    constructor(params: WheelSettings) {
        this.items = params.items;
        this.itemCount = this.items.length;
        this.itemWidth = params.itemWidth;
        this.itemHeight = params.itemHeight;

        this.itemRadius = this.circleDegrees / this.itemCount;
        this.length = this.itemCount * this.itemWidth;
        this.radius = this.length / (2 * Math.PI);
    }
}