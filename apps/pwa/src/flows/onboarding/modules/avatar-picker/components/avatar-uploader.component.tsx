"use client";

import { UploadDrawer } from "@/components/drawers/upload";
import { Button } from "@/components/ui";

import { Controller } from "react-hook-form";
import { useProfileAvatarUploader } from "@/features/profile/update/hooks";

import { GetUserUploads } from "@/api/user/uploads";
import { EditProfileFormSchemaValues } from "@/features/profile/update";

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
    } = useProfileAvatarUploader(cropperPageUrl);

    return (
        <Controller<EditProfileFormSchemaValues, "avatar">
            name={"avatar"}
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