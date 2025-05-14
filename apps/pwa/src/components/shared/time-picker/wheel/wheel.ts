import { ReactNode } from "react";

export type WheelParams = {
    loop: boolean;
    itemCount: number;
    itemSize: number;
    slideCount: number;
    itemsInView: number;
    perspective: "left" | "right";
    startIndex: number;
};

export class Wheel {
    loop: WheelParams["loop"];
    itemCount: WheelParams["itemCount"];
    itemSize: WheelParams["itemSize"];
    slidesCount: WheelParams["slideCount"];
    itemsInView: WheelParams["itemsInView"];
    perspective: WheelParams["perspective"];
    startIndex: WheelParams["startIndex"];

    slides: Array<string | number | ReactNode>;

    itemRadius: number;
    inViewDegrees: number;

    radius: number;
    totalRadius: number;
    rotationOffset: number;

    constructor(params: WheelParams) {
        this.loop = params.loop;
        this.itemSize = params.itemSize;
        this.itemCount = params.itemCount;
        this.slidesCount = params.slideCount;
        this.itemsInView = params.itemsInView;
        this.perspective = params.perspective;
        this.startIndex = params.startIndex;

        this.slides = Array.from(Array(params.slideCount).keys());

        this.itemRadius = 360 / this.itemCount;
        this.inViewDegrees = this.itemRadius * this.itemsInView;
        this.radius = Math.round(
            this.itemSize / 2 / Math.tan(Math.PI / this.itemCount),
        );

        this.totalRadius = this.slidesCount * this.itemRadius;
        this.rotationOffset = this.loop ? 0 : this.itemRadius;
    }
}