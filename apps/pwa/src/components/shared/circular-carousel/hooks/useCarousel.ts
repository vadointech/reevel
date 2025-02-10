import { Wheel, WheelParams } from "@/components/shared/circular-carousel/wheel";
import { CircularCarousel, Plugin } from "../carousel/types";

export function useCircularCarousel({ plugins, ...wheel }: WheelParams & {
  plugins?: Plugin[],
}) {
    return new CircularCarousel(
        new Wheel(wheel),
        plugins
    );
}