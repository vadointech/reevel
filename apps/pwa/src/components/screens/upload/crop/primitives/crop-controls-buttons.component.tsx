"use client";

import { useRouter } from "@/i18n/routing";
import { Button, Input } from "@/components/shared/_redesign";
import { useImageCropper, useImageUploader } from "@/features/uploader/image/hooks";

import styles from "../styles.module.scss";

export namespace CropControlsButtons {
    export type Props = never;
}

export const CropControlsButtons = () => {
    const router = useRouter();
    const { handleSelectFile, handleUploadFile } = useImageUploader({
        onSuccess: () => router.push("/event/create/preview"),
    });
    const { handleCrop } = useImageCropper(1, {
        onCropSuccess: handleUploadFile,
    });

    return (
        <div className={styles.crop__buttons}>
            <Input.File
                label={"Change Poster"}
                accept={"image/png, image/jpeg, image/webp"}
                onChange={handleSelectFile}
            />
            <Button onClick={handleCrop}>
                Confirm
            </Button>
        </div>
    );
};
