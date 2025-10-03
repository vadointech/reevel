"use client";

import { Button, Input } from "@/components/ui";
import { useProfileAvatarUploader } from "@/features/profile/update/hooks";

export namespace OnboardingAvatarUploadCropper {
    export type Props = {
        callbackUrl: string;
    };
}

export const OnboardingAvatarUploadCropper = ({ callbackUrl }: OnboardingAvatarUploadCropper.Props) => {
    const {
        isUploading,
        handleSelectFile,
        handleCropAvatar,
    } = useProfileAvatarUploader(callbackUrl);

    return (
        <>
            <Input.File
                label={"Change Photo"}
                accept={"image/png, image/jpeg, image/webp"}
                onChange={handleSelectFile}
            />
            <Button
                loading={isUploading}
                onClick={() => handleCropAvatar()}
            >
                Confirm
            </Button>
        </>
    );
};
