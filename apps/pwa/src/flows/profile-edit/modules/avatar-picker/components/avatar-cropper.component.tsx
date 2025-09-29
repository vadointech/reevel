"use client";

import { Button, Input } from "@/components/ui";

import { useEditProfileAvatarUploader } from "@/features/profile/edit/hooks";

export namespace EditProfileAvatarUploadCropper {
    export type Props = {
        callbackUrl: string;
    };
}

export const EditProfileAvatarUploadCropper = ({ callbackUrl }: EditProfileAvatarUploadCropper.Props) => {

    const {
        isUploading,
        handleSelectFile,
        handleCropAvatar,
    } = useEditProfileAvatarUploader(callbackUrl);

    return (
        <>
            <Input.File
                label={"Change Photo"}
                accept={"image/png, image/jpeg, image/webp"}
                onChange={handleSelectFile}
            />
            <Button
                loading={isUploading}
                onClick={() => handleCropAvatar()}>
                Confirm
            </Button>
        </>
    );
};
