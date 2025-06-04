"use client";

import { ComponentProps } from "react";

import useEmblaCarousel from "embla-carousel-react";

import { Button } from "@/components/shared/_redesign";
import { PreviewEventCard } from "../preview-event-card";
import { UploadDrawer } from "@/components/drawers/upload";

import styles from "./styles.module.scss";
import cx from "classnames";
import { useFormContext } from "react-hook-form";
import { CreateEventFormSchemaValues } from "@/features/event/create";

export namespace PreviewEventCarousel {
    export type Props = ComponentProps<"div">;
}

export const PreviewEventCarousel = ({
    className,
    ...props
}: PreviewEventCarousel.Props) => {
    const form = useFormContext<CreateEventFormSchemaValues>();

    const event = form.getValues();

    return (
        <div
            className={cx(
                styles.carousel,
                className,
            )}
            {...props}
        >
            <div
                className={cx(
                    styles.carousel__container,
                    styles.carousel__container_center, // remove (for carousel only)
                )}
            >
                <PreviewEventCard event={event} />
                {/*<Carousel />*/}
            </div>
            <div className={styles.carousel__buttons}>
                <UploadDrawer>
                    <Button variant={"secondary-muted"}>
                        Change Poster
                    </Button>
                </UploadDrawer>
                <Button variant={"primary"}>
                    Publish event
                </Button>
            </div>
        </div>
    );
};

const Carousel = ({ event }: PreviewEventCard.Data) => {
    const [emblaRef] = useEmblaCarousel({});

    return (
        <div ref={emblaRef}>
            <div className={styles.carousel__content}>
                <PreviewEventCard event={event} />
                <PreviewEventCard event={event} />
                <PreviewEventCard event={event} />
                <PreviewEventCard event={event} />
                <PreviewEventCard event={event} />
            </div>
        </div>
    );
};