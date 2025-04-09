import { EmblaCarouselType } from "embla-carousel";
import { Wheel } from "@/components/shared/time-picker/wheel/wheel";
import { Handlers } from "./handlers";

export class PickerCarousel {
    public api: EmblaCarouselType;
    public wheel: Wheel;
    public handlers: Handlers;

    constructor(params: {
        api: EmblaCarouselType,
        wheel: Wheel,
        handlers: Handlers,
    }) {
        this.api = params.api;
        this.wheel = params.wheel;
        this.handlers = params.handlers;
    }
}