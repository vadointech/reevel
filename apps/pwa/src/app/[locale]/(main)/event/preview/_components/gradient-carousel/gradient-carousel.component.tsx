import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback, useState } from 'react';
import { PreviewCard } from "../preview-card";
import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite"
import { useEventStore } from '@/features/event';
import { prominent } from 'color.js';
import { ColorExtract } from '@/utils/color-extract';

const DEFAULT_GRADIENTS = [
    '#274462',
    '#559715',
    '#172B0F',
    '#AB002F',
    '#5695C8',
];

export const GradientCarousel = observer(() => {
    const colors = ColorExtract("/assets/temp/carousel2.jpg", 3).concat(DEFAULT_GRADIENTS)


    const eventStore = useEventStore()
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'center',
        skipSnaps: false,
        containScroll: 'trimSnaps'
    });

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        eventStore.setGradient(DEFAULT_GRADIENTS[emblaApi.selectedScrollSnap()]);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        onSelect();

        return () => {
            if (emblaApi) emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={styles.embla__container}>
                    {colors.map((gradient, index) => (
                        <div className={styles.embla__slide} key={index}>
                            <PreviewCard
                                currency='$'
                                size={"large"}
                                primaryColor={gradient}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
})