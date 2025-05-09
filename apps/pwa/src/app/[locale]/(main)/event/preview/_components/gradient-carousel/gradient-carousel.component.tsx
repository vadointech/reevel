import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback, useState } from 'react';
import { PreviewCard } from "../preview-card";
import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite"
import { useEventStore } from '@/features/event';

const gradients = [
    '#274462',
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
                                description='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making...'
                                currency='$'
                                price='14'
                                date={new Date()}
                                location='Mall Sky Park'
                                size={"large"}
                                poster={"/assets/temp/carousel2.jpg"}
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