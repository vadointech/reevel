"use client";

import { Button, Input } from "@/components/shared/_redesign";
import { useImageCropper, useImageUploader } from "@/features/uploader/image/hooks";
import { useCreateEventPosterUpload } from "@/features/event/create/hooks";


export namespace UploadPosterCropper {
    export type Props = {
        callbackUrl: string;
    };
}

export const UploadPosterCropper = ({ callbackUrl }: UploadPosterCropper.Props) => {
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
