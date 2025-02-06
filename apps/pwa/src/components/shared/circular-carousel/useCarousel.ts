import { Wheel } from "./wheel";
import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";

export type WheelRef = {
  wheel: HTMLDivElement | null;
  wheelItem: HTMLDivElement | null;
}

export function useCarousel(wheel: Wheel) {
    const wheelRef = useRef<WheelRef>({
        wheel: null,
        wheelItem: null
    });

    const [sliderRef, emblaApi] = useEmblaCarousel({
        loop: true,
        axis: "x",
        direction: "ltr",
        align: "center",
        dragFree: true,
        watchSlides: false,
    });

    const onPointerUp = useCallback((api: EmblaCarouselType) => {
        const { scrollTo, target, location } = api.internalEngine();
        const diffToTarget = target.get() - location.get();
        const factor = Math.abs(diffToTarget) < wheel.itemWidth / 2.5 ? 10 : 0.1;
        const distance = diffToTarget * factor;
        scrollTo.distance(distance, true);
    }, []);

    const onScroll = useCallback((api: EmblaCarouselType) => {
        const progress = api.scrollProgress();

        if(wheelRef.current.wheel) {
            wheelRef.current.wheel.style.rotate =`-${(progress * wheel.itemCount * wheel.itemRadius) + 90}deg`;
        }
    }, []);

    useEffect(() => {
        if(!emblaApi) return;

        emblaApi.on("pointerUp", onPointerUp);
        emblaApi.on("scroll", onScroll);


    }, [emblaApi]);

    return [wheelRef, sliderRef] as const;
}