import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback, useState } from 'react';
import { PreviewCard } from "../preview-card";
import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite"
import { useEventStore } from '@/features/event';

const gradients = [
    '#5695C8',
    '#559715',
    '#172B0F',
    '#AB002F',
    '#5695C8',
    '#5695C8',

];

export const GradientCarousel = observer(() => {

    const eventStore = useEventStore()
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'center',
        skipSnaps: false,
        containScroll: 'trimSnaps'
    });

    console.log(eventStore.gradient)

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        eventStore.setGradient(gradients[emblaApi.selectedScrollSnap()]);
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
                    {gradients.map((gradient, index) => (
                        <div className={styles.embla__slide} key={index}>
                            <PreviewCard
                                size={"large"}
                                poster={"/assets/temp/poster5.png"}
                                primaryColor={gradient}
                                title={"Happy Valentine's Day Party"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
})