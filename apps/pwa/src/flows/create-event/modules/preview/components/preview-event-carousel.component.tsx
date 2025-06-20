import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { CreateEventPreviewCard } from "./preview-event-card.component";

import { EmblaCarouselType } from "embla-carousel";
import { CreateEventFormSchemaValues } from "@/features/event/create";
import { UserProfileEntity } from "@/entities/profile";

import styles from "../styles/create-event-preview-carousel.module.scss";

export namespace CreateEventPreviewCarousel {
    export type Data = {
        posterUrl: string | undefined;
        posterColorPalette: string[];
        eventData: CreateEventFormSchemaValues;
        host?: UserProfileEntity;
        onPrimaryColorChange?: (color: string) => void;
    };
    export type Props = Data;
}

export const CreateEventPreviewCarousel = ({
    eventData,
    posterColorPalette,
    posterUrl,
    host,
    onPrimaryColorChange,
}: CreateEventPreviewCarousel.Data) => {
    const [emblaRef, emblaApi] = useEmblaCarousel();

    const handlePointerUp = useCallback((api: EmblaCarouselType) => {
        const snapIndex = api.selectedScrollSnap();
        if(!snapIndex || snapIndex < 0 || snapIndex >= posterColorPalette.length) return;

        onPrimaryColorChange?.(posterColorPalette[snapIndex]);
    }, [onPrimaryColorChange]);

    useEffect(() => {
        if(!emblaApi) return;

        emblaApi.on("pointerUp", handlePointerUp);

        handlePointerUp(emblaApi);
        return () => {
            emblaApi.off("pointerUp", handlePointerUp);
        };
    }, [emblaApi, handlePointerUp]);

    return (
        <div ref={emblaRef}>
            <div className={styles.carousel}>
                {
                    posterColorPalette.map(color => (
                        <CreateEventPreviewCard
                            key={color}
                            host={host}
                            eventData={eventData}
                            posterUrl={posterUrl}
                            posterPrimaryColor={color}
                        />
                    ))
                }
            </div>
        </div>
    );
};