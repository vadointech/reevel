"use client";

import { Button, Input } from "@/components/ui";

import { useEditProfileAvatarUploader } from "@/features/profile/edit/hooks";

export namespace EditProfileBackGroundUploadCropper {
    export type Props = {
        callbackUrl: string;
    };
}

export const EditProfileBackGroundUploadCropper = ({ callbackUrl }: EditProfileBackGroundUploadCropper.Props) => {

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
