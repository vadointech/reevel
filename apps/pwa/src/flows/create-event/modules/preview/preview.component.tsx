"use client";

import { ComponentProps, useMemo } from "react";

import { useSessionContext } from "@/features/session";
import { useCreateEventPreview } from "@/features/event/create/hooks";

import { Button } from "@/components/ui";
import { UploadDrawer } from "@/components/drawers/upload";
import { CreateEventPreviewCard, CreateEventPreviewCarousel } from "./components";

import { GetUserUploads } from "@/api/user/uploads";
import { CreateEventFormSchemaValues } from "@/features/event/create";

import styles from "./styles/create-event-preview.module.scss";
import cx from "classnames";

export namespace CreateEventPreview {
    export type Props = ComponentProps<"div"> & {
        uploads: GetUserUploads.TOutput
        callbackUrl: string;
        cropperPageUrl?: string;
    };

    export type PickerProps = {
        uploads: GetUserUploads.TOutput
        formValues: CreateEventFormSchemaValues;
        onPrimaryColorChange?: (color: string) => void;
    };
}

export const CreateEventPreview = ({
    uploads,
    callbackUrl,
    cropperPageUrl,
}: CreateEventPreview.Props) => {

    const {
        formValues,
        isPublishing,
        handleSelectFile,
        handlePosterPick,
        handlePosterDelete,
        handlePublishEvent,
        handlePosterPrimaryColorChange,
        uploadDrawerController,
    } = useCreateEventPreview({ callbackUrl, cropperPageUrl });

    return (
        <>
            {
                formValues ?
                    <PosterPicker
                        uploads={uploads}
                        formValues={formValues}
                        onPrimaryColorChange={handlePosterPrimaryColorChange}
                    /> : null
            }
            <div className={styles.screen__buttons}>
                <UploadDrawer
                    uploads={uploads}
                    onImagePick={handlePosterPick}
                    onImageDelete={handlePosterDelete}
                    onFileSelect={handleSelectFile}
                    selectedImageUrl={formValues?.poster?.fileUrl}
                    controller={uploadDrawerController}
                >
                    <Button variant={"secondary-muted"}>
                        Change Poster
                    </Button>
                </UploadDrawer>
                <Button
                    variant={"primary"}
                    loading={isPublishing}
                    onClick={handlePublishEvent}
                >
                    Publish event
                </Button>
            </div>
        </>
    );
};

const PosterPicker = ({
    formValues,
    uploads,
    onPrimaryColorChange,
}: CreateEventPreview.PickerProps) => {
    const session = useSessionContext();

    const pickerCarouselData = useMemo(() => {
        return uploads.find(item => item.id === formValues?.poster?.id);
    }, [uploads, formValues]);

    if(pickerCarouselData?.colorPalette && pickerCarouselData.colorPalette.length > 1) {
        return (
            <div
                className={cx(
                    styles.screen__container,
                )}
            >
                <CreateEventPreviewCarousel
                    host={session.store.user?.profile}
                    posterUrl={pickerCarouselData.fileUrl}
                    posterColorPalette={pickerCarouselData?.colorPalette}
                    eventData={formValues}
                    onPrimaryColorChange={onPrimaryColorChange}
                />
            </div>
        );
    } else {
        return (
            <div
                className={cx(
                    styles.screen__container,
                    styles.screen__container_center,
                )}
            >
                <CreateEventPreviewCard
                    host={session.store.user?.profile}
                    posterUrl={pickerCarouselData?.fileUrl}
                    posterPrimaryColor={pickerCarouselData?.colorPalette[0]}
                    eventData={formValues}
                />
            </div>
        );
    }
};