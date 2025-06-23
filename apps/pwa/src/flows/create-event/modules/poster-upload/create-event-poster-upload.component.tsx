"use client";

import { useImageCropper, useImageUploader } from "@/features/uploader/image/hooks";
import { useCreateEventPosterUpload } from "@/features/event/create/hooks";

import { Button, Input } from "@/components/ui";

export namespace CreateEventPosterUploadCropper {
    export type Props = {
        callbackUrl: string;
    };
}

export const CreateEventPosterUploadCropper = ({ callbackUrl }: CreateEventPosterUploadCropper.Props) => {
    const { handleUpload } = useCreateEventPosterUpload({ callbackUrl });

    const { handleSelectFile } = useImageUploader();
    const { handleCrop } = useImageCropper(1, {
        onCropSuccess: handleUpload,
    });

    return (
        <>
            <Input.File
                label={"Change Poster"}
                accept={"image/png, image/jpeg, image/webp"}
                onChange={handleSelectFile}
            />
            <Button onClick={handleCrop}>
                Confirm
            </Button>
        </>
    );
};
