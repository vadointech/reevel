"use client";

import { useOnboardingAvatarUploader } from "@/features/onboarding/hooks";

import { UploadDrawer } from "@/components/drawers/upload";
import { Button } from "@/components/ui";

import { GetUserUploads } from "@/api/user/uploads";
import { Controller } from "react-hook-form";

export namespace OnboardingAvatarUploader {
    export type Props = {
        uploads: GetUserUploads.TOutput;
        cropperPageUrl: string;
    };
}

export const OnboardingAvatarUploader = ({
    uploads,
    cropperPageUrl,
}: OnboardingAvatarUploader.Props) => {
    const {
        handleAvatarPick,
        handleAvatarDelete,
        uploadDrawerController,
    } = useOnboardingAvatarUploader();

    return (
        <Controller
            name={"picture"}
            render={({ field }) => (
                <UploadDrawer
                    uploads={uploads}
                    gridVariant={"rounded"}
                    cropperPageUrl={cropperPageUrl}
                    selectedImageUrl={field.value}
                    onImagePick={handleAvatarPick}
                    onImageDelete={handleAvatarDelete}
                    controller={uploadDrawerController}
                >
                    <Button variant={"accent-muted"}>
                        Upload custom photo
                    </Button>
                </UploadDrawer>
            )}
        />
    );
};