import { PickerCarousel } from "./picker-carousel";
import { setContainerStyles, setSlideStyles } from "../utils";

export type Handlers = Partial<{
    onChange: (carousel: PickerCarousel) => void;
}>;

export function onActivate({ api }: PickerCarousel) {
    if (!api) return;
    const { translate, slideLooper } = api.internalEngine();
    translate.clear();
    translate.toggleActive(false);
    slideLooper.loopPoints.forEach(({ translate }) => {
        translate.clear();
        translate.toggleActive(false);
    });
}

export function onScroll({ api, wheel }: PickerCarousel) {
    const rotation = wheel.slidesCount * wheel.itemRadius - wheel.rotationOffset;
    const wheelRotation = rotation * api.scrollProgress();
    setContainerStyles(api, wheelRotation, wheel);
    api.slideNodes().forEach((_, index) => {
        setSlideStyles(api, index, wheel);
    });
}

export function onPointerUp({ api, wheel }: PickerCarousel) {
    const { scrollTo, target, location } = api.internalEngine();
    const diffToTarget = target.get() - location.get();
    const factor = Math.abs(diffToTarget) < wheel.itemSize / 2.5 ? 10 : 0.1;
    const distance = diffToTarget * factor;
    scrollTo.distance(distance, true);
}

export const onChange = (carousel: PickerCarousel) => {
    const { handlers } = carousel;
    handlers.onChange?.(carousel);
};