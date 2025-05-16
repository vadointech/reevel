import { EmblaCarouselType } from "embla-carousel";
import { Wheel } from "../wheel/wheel";

export function isInView(wheelLocation: number, slidePosition: number, wheel: Wheel): boolean {
    return Math.abs(wheelLocation - slidePosition) < wheel.inViewDegrees;
}

export function setSlideStyles(
    emblaApi: EmblaCarouselType,
    index: number,
    wheel: Wheel,
): void {
    const slideNode = emblaApi.slideNodes()[index];
    const wheelLocation = emblaApi.scrollProgress() * wheel.totalRadius;
    const positionDefault = emblaApi.scrollSnapList()[index] * wheel.totalRadius;
    const positionLoopStart = positionDefault + wheel.totalRadius;
    const positionLoopEnd = positionDefault - wheel.totalRadius;

    let inView = false;
    let angle = index * -wheel.itemRadius;

    if (isInView(wheelLocation, positionDefault, wheel)) {
        inView = true;
    }

    if (wheel.loop && isInView(wheelLocation, positionLoopEnd, wheel)) {
        inView = true;
        angle = -360 + (wheel.slidesCount - index) * wheel.itemRadius;
    }

    if (wheel.loop && isInView(wheelLocation, positionLoopStart, wheel)) {
        inView = true;
        angle = -(wheel.totalRadius % 360) - index * wheel.itemRadius;
    }

    if (inView) {
        slideNode.style.opacity = "1";
        slideNode.style.transform = `translateY(-${ index * 100 }%) rotateX(${angle}deg) translateZ(${wheel.radius}px)`;
    } else {
        slideNode.style.opacity = "0";
        slideNode.style.transform = "none";
    }
}