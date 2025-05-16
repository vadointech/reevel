"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { TimePicker } from "./use-time-picker.hook";
import { PickerCarousel } from "../carousel/picker-carousel";
import { onPointerUp, onScroll, onActivate, onChange } from "../carousel/handlers";

export function useTimePickerCarousel(controls: TimePicker) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        axis: "y",
        dragFree: true,
        containScroll: false,
        watchSlides: false,
        loop: controls.wheel.loop,
        startIndex: controls.wheel.startIndex,
    });

    useEffect(() => {
        if (!emblaApi) return;

        const pickerCarousel = new PickerCarousel({
            api: emblaApi,
            wheel: controls.wheel,
            handlers: controls.handlers,
        });

        emblaApi.on("pointerUp", () => {
            onPointerUp(pickerCarousel);
            onChange(pickerCarousel);
        });

        emblaApi.on("scroll", () => onScroll(pickerCarousel));

        emblaApi.on("reInit", () => {
            onActivate(pickerCarousel);
            onScroll(pickerCarousel);
        });

        onActivate(pickerCarousel);
        onScroll(pickerCarousel);
    }, [emblaApi]);

    return [emblaRef] as const;
}