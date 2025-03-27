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
    let isActive = false;

    if (isInView(wheelLocation, positionDefault, wheel)) {
        inView = true;
        isActive = Math.abs(wheelLocation - positionDefault) < wheel.itemRadius / 2;
    }

    if (wheel.loop && isInView(wheelLocation, positionLoopEnd, wheel)) {
        inView = true;
        angle = -360 + (wheel.slidesCount - index) * wheel.itemRadius;
        isActive = Math.abs(wheelLocation - positionLoopEnd) < wheel.itemRadius / 2;
    }

    if (wheel.loop && isInView(wheelLocation, positionLoopStart, wheel)) {
        inView = true;
        angle = -(wheel.totalRadius % 360) - index * wheel.itemRadius;
        isActive = Math.abs(wheelLocation - positionLoopStart) < wheel.itemRadius / 2;
    }

    if (inView) {
        slideNode.style.opacity = "0.1";
        slideNode.style.transform = `translateY(-${index * 100
            }%) rotateX(${angle}deg) translateZ(${wheel.radius}px)`;
        if (isActive) {
            slideNode.style.opacity = "1";
            slideNode.classList.add('active');
        } else {
            slideNode.classList.remove('active');
        }
    } else {
        slideNode.style.opacity = "0";
        slideNode.style.transform = "none";
        slideNode.classList.remove('active');
    }
};