"use client";

import { ComponentProps } from "react";

import useEmblaCarousel from "embla-carousel-react";

import { Button } from "@/components/shared/_redesign";
import { PreviewEventCard } from "../preview-event-card";
import { UploadDrawer } from "@/components/drawers/upload";
import { useCreateEventPreview } from "@/features/event/create/hooks";
import { GetUserUploads } from "../../../../../../api/user/uploads/get-uploads";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace PreviewEventCarousel {
    export type Props = ComponentProps<"div"> & {
        uploads: GetUserUploads.TOutput
        callbackUrl: string;
        cropperPageUrl?: string;
    };
}

export const PreviewEventCarousel = ({
    uploads,
    className,
    callbackUrl,
    cropperPageUrl,
    ...props
}: PreviewEventCarousel.Props) => {

    const {
        session,
        formValues,
        handlePosterPick,
        handlePosterDelete,
        handlePublishEvent,
        uploadDrawerController,
    } = useCreateEventPreview({ callbackUrl });

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
                {
                    formValues ? (
                        <PreviewEventCard host={session.user?.profile} event={formValues} />
                    ) : null
                }
            </div>
            <div className={styles.carousel__buttons}>
                <UploadDrawer
                    uploads={uploads}
                    cropperPageUrl={cropperPageUrl}
                    onImagePick={handlePosterPick}
                    onImageDelete={handlePosterDelete}
                    selectedImageUrl={formValues?.poster}
                    controller={uploadDrawerController}
                >
                    <Button variant={"secondary-muted"}>
                        Change Poster
                    </Button>
                </UploadDrawer>
                <Button
                    variant={"primary"}
                    onClick={handlePublishEvent}
                >
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