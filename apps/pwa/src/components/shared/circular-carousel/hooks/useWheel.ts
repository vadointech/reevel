import { useEffect, useRef } from "react";
import { WheelRef } from "../wheel";
import useEmblaCarousel from "embla-carousel-react";
import { Carousel, CircularCarousel } from "../carousel/types";
import { onPointerUp, onScroll } from "../carousel/handlers";

export function useWheel({ wheel, plugins }: CircularCarousel) {
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

    useEffect(() => {
        if(!emblaApi) return;

        const carousel = new Carousel({
            wheel,
            wheelRef,
            api: emblaApi,
            plugins: plugins
        });

        emblaApi.on("pointerUp", () => onPointerUp(carousel));
        emblaApi.on("scroll", () => onScroll(carousel));
        emblaApi.on("reInit", () => onScroll(carousel));

        onScroll(carousel);
    }, [emblaApi, wheel, wheelRef]);

    return [wheelRef, sliderRef] as const;
}