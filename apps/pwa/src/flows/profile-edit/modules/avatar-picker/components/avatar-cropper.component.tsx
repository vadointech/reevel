"use client";

import { Button, Input } from "@/components/ui";

import { useCallback } from "react";
import { useImageUploaderContext } from "@/features/uploader/image";
import { useEditProfileAvatarUploader } from "@/features/profile/edit/hooks/use-avatar-uploader.hook";

export namespace EditProfileAvatarUploadCropper {
    export type Props = {
        callbackUrl: string;
    };
}

export const EditProfileAvatarUploadCropper = ({ callbackUrl }: EditProfileAvatarUploadCropper.Props) => {

    const {
        handleSelectFile,
        handleFileUpload,
    } = useEditProfileAvatarUploader(callbackUrl);

    const { controller } = useImageUploaderContext();

    const handleCrop = useCallback(() => {
        controller.cropImage().then(handleFileUpload);
    }, []);

    return (
        <>
            <Input.File
                label={"Change Photo"}
                accept={"image/png, image/jpeg, image/webp"}
                onChange={handleSelectFile}
            />
            <Button onClick={handleCrop}>
                Confirm
            </Button>
        </>
    );
};
