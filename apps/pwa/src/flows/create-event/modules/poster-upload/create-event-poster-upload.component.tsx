"use client";

import { useCreateEventPosterUpload } from "@/features/event/create/hooks";
import { Button, Input } from "@/components/ui";

export namespace CreateEventPosterUploadCropper {
    export type Props = {
        callbackUrl: string;
    };
}

export const CreateEventPosterUploadCropper = ({ callbackUrl }: CreateEventPosterUploadCropper.Props) => {
    const {
        handleSelectFile,
        handleCropPoster,
    } = useCreateEventPosterUpload(callbackUrl);

    return (
        <>
            <Input.File
                label={"Change Poster"}
                accept={"image/png, image/jpeg, image/webp"}
                onChange={handleSelectFile}
            />
            <Button
                onClick={() => handleCropPoster()}
            >
                Confirm
            </Button>
        </>
    );
};
