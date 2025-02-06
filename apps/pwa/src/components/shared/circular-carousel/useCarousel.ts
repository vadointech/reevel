import { Wheel } from "./wheel";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";

export type WheelRef = {
  wheel: HTMLDivElement | null;
  wheelItem: Array<HTMLDivElement | null>;
}

export function useCarousel(wheel: Wheel) {
    const wheelRef = useRef<WheelRef>({
        wheel: null,
        wheelItem: []
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
        const progressDegree = progress * wheel.itemCount * wheel.itemRadius;
        if(wheelRef.current.wheel) {
            wheelRef.current.wheel.style.rotate =`-${progressDegree + 90}deg`;
        }


        const activeIndex = api.selectedScrollSnap();

        if(wheelRef.current.wheelItem) {
            wheelRef.current.wheelItem.forEach((item, index) => {
                if(item) {
                    const scale = index === activeIndex ? 1.2 : 1; // Активний — більший
                    item.style.transition = "transform 0.3s ease-in-out"; // Плавність зміни масштабу
                    item.style.transform = `scale(${scale})`;
                }
            });
        }
    }, []);

    useEffect(() => {
        if(!emblaApi) return;

        emblaApi.on("pointerUp", onPointerUp);
        emblaApi.on("scroll", onScroll);
        emblaApi.on("reInit", onScroll);

        onScroll(emblaApi);
    }, [emblaApi]);

    return [wheelRef, sliderRef] as const;
}