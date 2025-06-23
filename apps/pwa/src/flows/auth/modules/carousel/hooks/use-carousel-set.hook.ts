import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import { EmblaCarouselType } from "embla-carousel";

export function useAuthCarouselSet({ delay, speed }: {
    delay: number;
    speed: number;
}) {
    const [sliderRef, emblaApi] = useEmblaCarousel({
        axis: "x",
        loop: true,
        duration: 50,
        align: "center",
    });


    const sleep = useCallback((delay: number) => {
        return new Promise(resolve => setTimeout(resolve, delay));
    }, [delay]);

    const autoScroll = useCallback((api: EmblaCarouselType) => {
        setInterval(() => api.scrollNext(), speed);
    }, [speed]);

    useEffect(() => {
        if(!emblaApi) return;

        if(delay === 0) {
            emblaApi.scrollNext();
        }

        sleep(delay).then(() => autoScroll(emblaApi));

    }, [emblaApi, speed, delay]);


    return [sliderRef] as const;
}