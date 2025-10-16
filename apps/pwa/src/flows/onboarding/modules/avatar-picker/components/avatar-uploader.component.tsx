"use client";

import { UploadDrawer } from "@/components/drawers/upload";
import { Button } from "@/components/ui";

import { Controller } from "react-hook-form";
import { useProfileAvatarUploader } from "@/features/profile/update/hooks";

import { EditProfileFormSchemaValues } from "@/features/profile/update";
import { useQuery } from "@tanstack/react-query";
import { GetCurrentUserUploadsQuery } from "@/features/profile/queries";
import { SupportedFileCollections } from "@/entities/uploads";

export namespace OnboardingAvatarUploader {
    export type Props = {
        cropperPageUrl: string;
    };
}

export const OnboardingAvatarUploader = ({
    cropperPageUrl,
}: OnboardingAvatarUploader.Props) => {
    const {
        handlePickAvatar,
        handleDeleteAvatar,
        handleSelectFile,
        uploadDrawerController,
    } = useProfileAvatarUploader(cropperPageUrl);

    const { data: uploads } = useQuery(
        GetCurrentUserUploadsQuery({
            collection: SupportedFileCollections.PROFILE_PICTURE,
        }),
    );

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