import { Carousel } from "./types";

export const onPointerUp = ({ api }: Carousel) => {
    const { scrollTo, target, location } = api.internalEngine();
    const diffToTarget = target.get() - location.get();
    const distance = diffToTarget * 0.1;
    scrollTo.distance(distance, true);
};

export const onScroll = (carousel: Carousel) => {
    const { api, wheel, wheelRef, plugins } = carousel;

    const progress = api.scrollProgress();
    const progressDegree = progress * wheel.itemCount * wheel.itemRadius;
    if(wheelRef.current.wheel) {
        wheelRef.current.wheel.style.rotate =`-${progressDegree + 90}deg`;
    }

    plugins.forEach((plugin) => plugin(carousel));
};

export const onChange = (carousel: Carousel) => {
    const { handlers } = carousel;
    handlers.onChange?.(carousel);
};