"use client";

import { useImageUploader } from "@/features/uploader/image/hooks";
import { useCreateEventPosterUpload } from "@/features/event/create/hooks";

import { Button, Input } from "@/components/ui";
import { useImageUploaderContext } from "@/features/uploader/image";
import { useCallback } from "react";

export namespace CreateEventPosterUploadCropper {
    export type Props = {
        callbackUrl: string;
    };
}

export const CreateEventPosterUploadCropper = ({ callbackUrl }: CreateEventPosterUploadCropper.Props) => {
    const { handleUpload } = useCreateEventPosterUpload({ callbackUrl });

    const { handleSelectFile } = useImageUploader();
    const { controller } = useImageUploaderContext();

    const handleCrop = useCallback(() => {
        controller.cropImage().then(handleUpload);
    }, []);

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
