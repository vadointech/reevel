"use client";

import { Button, Input } from "@/components/ui";

import { useOnboardingAvatarUploader } from "@/features/onboarding/hooks";
import { useCallback } from "react";
import { useImageUploaderContext } from "@/features/uploader/image";

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
