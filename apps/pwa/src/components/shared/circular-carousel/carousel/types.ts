import { RefObject } from "react";
import { Wheel, WheelRef } from "../wheel";
import { EmblaCarouselType } from "embla-carousel";

export type Plugin = (carousel: Carousel) => void;

export class CircularCarousel {
    constructor(
        public wheel: Wheel,
        public plugins?: Plugin[],
    ) {}
}

export class Carousel {
    public api: EmblaCarouselType;
    public wheel: Wheel;
    public wheelRef: RefObject<WheelRef>;
    public plugins: Plugin[];

    constructor({
        api,
        wheel,
        wheelRef,
        plugins = [],
    }: {
        api: EmblaCarouselType;
        wheel: Wheel;
        wheelRef: RefObject<WheelRef>;
        plugins?: Plugin[]
    }) {
        this.api = api;
        this.wheel = wheel;
        this.wheelRef = wheelRef;
        this.plugins = plugins;
    }
}