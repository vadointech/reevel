"use client";

import { UploadDrawer } from "@/components/drawers/upload";
import { Button } from "@/components/ui";

import { GetUserUploads } from "@/api/user/uploads";
import { Controller } from "react-hook-form";
import { useEditProfileAvatarUploader } from "@/features/profile/edit/hooks";

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
        handlePickAvatar,
        handleDeleteAvatar,
        handleSelectFile,
        uploadDrawerController,
    } = useEditProfileAvatarUploader(cropperPageUrl);

    return (
        <Controller
            name={"picture"}
            render={({ field }) => (
                <UploadDrawer
                    title="Profile picture"
                    uploads={uploads}
                    gridVariant={"rounded"}
                    selectedImageUrl={field.value}
                    onImagePick={handlePickAvatar}
                    onImageDelete={handleDeleteAvatar}
                    onFileSelect={handleSelectFile}
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