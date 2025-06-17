"use client";

import { Button, Input } from "@/components/ui";

import { useImageCropper } from "@/features/uploader/image/hooks";
import { useOnboardingAvatarUploader } from "@/features/onboarding/hooks";

export namespace OnboardingAvatarUploadCropper {
    export type Props = {
        callbackUrl: string;
    };
}

export const OnboardingAvatarUploadCropper = ({ callbackUrl }: OnboardingAvatarUploadCropper.Props) => {

    const {
        handleSelectFile,
        handleFileUpload,
    } = useOnboardingAvatarUploader(callbackUrl);

    const { handleCrop } = useImageCropper(1, {
        onCropSuccess: handleFileUpload,
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
