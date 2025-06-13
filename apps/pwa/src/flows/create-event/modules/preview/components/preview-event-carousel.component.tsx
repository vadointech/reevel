import useEmblaCarousel from "embla-carousel-react";

import { CreateEventPreviewCard } from "./preview-event-card.component";

import { CreateEventFormSchemaValues } from "@/features/event/create";
import { UserProfileEntity } from "@/entities/profile";

import styles from "../styles/create-event-preview-carousel.module.scss";

export namespace CreateEventPreviewCarousel {
    export type Data = {
        event: CreateEventFormSchemaValues;
        host?: UserProfileEntity
    };
    export type Props = Data;
}

export const CreateEventPreviewCarousel = ({ event, host }: CreateEventPreviewCarousel.Data) => {
    const [emblaRef] = useEmblaCarousel({});

    return (
        <div ref={emblaRef}>
            <div className={styles.carousel}>
                <CreateEventPreviewCard host={host} event={event} />
                <CreateEventPreviewCard host={host} event={event} />
                <CreateEventPreviewCard host={host} event={event} />
                <CreateEventPreviewCard host={host} event={event} />
                <CreateEventPreviewCard host={host} event={event} />
            </div>
        </div>
    );
};