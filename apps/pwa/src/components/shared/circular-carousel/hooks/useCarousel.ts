import { Wheel, WheelParams } from "@/components/shared/circular-carousel/wheel";
import { CircularCarousel, Handlers, Plugin } from "../carousel/types";

export function useCircularCarousel({ plugins, handlers, ...wheel }: WheelParams & {
    plugins?: Plugin[],
    handlers?: Handlers
}) {
    return new CircularCarousel(
        new Wheel(wheel),
        plugins,
        handlers,
    );
}