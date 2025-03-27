import { EmblaCarouselType } from "embla-carousel";
import { Wheel } from "../wheel/wheel";

export const setContainerStyles = (
    emblaApi: EmblaCarouselType,
    wheelRotation: number,
    wheel: Wheel,
): void => {
    emblaApi.containerNode().style.transform = `translateZ(${wheel.radius}px) rotateX(${wheelRotation}deg)`;
};
