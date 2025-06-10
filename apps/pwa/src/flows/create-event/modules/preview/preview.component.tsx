"use client";

import { ComponentProps } from "react";

import { Button } from "@/components/shared/_redesign";
import { CreateEventPreviewCard } from "./components/preview-event-card.component";
import { UploadDrawer } from "@/components/drawers/upload";
import { useCreateEventPreview } from "@/features/event/create/hooks";
import { GetUserUploads } from "@/api/user/uploads";

import styles from "./styles/create-event-preview.module.scss";
import cx from "classnames";

export namespace CreateEventPreview {
    export type Props = ComponentProps<"div"> & {
        uploads: GetUserUploads.TOutput
        callbackUrl: string;
        cropperPageUrl?: string;
    };
}

export const CreateEventPreview = ({
    uploads,
    callbackUrl,
    cropperPageUrl,
}: CreateEventPreview.Props) => {

    const {
        session,
        formValues,
        handlePosterPick,
        handlePosterDelete,
        handlePublishEvent,
        uploadDrawerController,
    } = useCreateEventPreview({ callbackUrl });

    return (
        <>
            <div
                className={cx(
                    styles.screen__container,
                    styles.screen__container_center, // remove (for carousel only)
                )}
            >
                {
                    formValues ? (
                        // <CreateEventPreviewCarousel host={session.user?.profile} event={formValues} />
                        <CreateEventPreviewCard host={session.user?.profile} event={formValues} />
                    ) : null
                }
            </div>
            <div className={styles.screen__buttons}>
                <UploadDrawer
                    uploads={uploads}
                    cropperPageUrl={cropperPageUrl}
                    onImagePick={handlePosterPick}
                    onImageDelete={handlePosterDelete}
                    selectedImageUrl={formValues?.poster?.fileUrl}
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
        </>
    );
};