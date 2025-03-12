import { RefObject } from "react";
import { Wheel, WheelRef } from "../wheel";
import { EmblaCarouselType } from "embla-carousel";

export type Plugin = (carousel: Carousel) => void;

export type Handlers = Partial<{
    onChange: (carousel: Carousel) => void;
}>;

export class CircularCarousel {
    constructor(
        public wheel: Wheel,
        public plugins?: Plugin[],
        public handlers?: Handlers,
    ) {}
}

export class Carousel {
    public api: EmblaCarouselType;
    public wheel: Wheel;
    public wheelRef: RefObject<WheelRef>;
    public plugins: Plugin[];
    public handlers: Handlers;

    constructor({
        api,
        wheel,
        wheelRef,
        plugins = [],
        handlers = {},
    }: {
        api: EmblaCarouselType;
        wheel: Wheel;
        wheelRef: RefObject<WheelRef>;
        plugins?: Plugin[];
        handlers?: Handlers;
    }) {
        this.api = api;
        this.wheel = wheel;
        this.wheelRef = wheelRef;
        this.plugins = plugins;
        this.handlers = handlers;
    }
}