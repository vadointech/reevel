import { Wheel, WheelRef } from "./wheel";
import { EmblaCarouselType } from "embla-carousel";
import { RefObject } from "react";

export type Plugin = (carousel: Carousel) => void;

export type Handlers = Partial<{
    onChange: (carousel: Carousel) => void;
}>;

export type ICarousel = {
    api: EmblaCarouselType;
    wheel: Wheel;
    wheelRef: RefObject<WheelRef>;
    plugins?: Plugin[];
    handlers?: Handlers;
};

export class Carousel implements ICarousel {
    public api: EmblaCarouselType;
    public wheel: Wheel;
    public wheelRef: RefObject<WheelRef>;
    public plugins: Plugin[];
    public handlers: Handlers;

    constructor(params: ICarousel) {
        this.api = params.api;
        this.wheel = params.wheel;
        this.wheelRef = params.wheelRef;
        this.plugins = params.plugins || [];
        this.handlers = params.handlers || {};
    }
}