"use client";

import { UploadDrawer } from "@/components/drawers/upload";
import { Avatar } from "@/components/ui";

import { Controller } from "react-hook-form";
import { useProfileAvatarUploader } from "@/features/profile/update/hooks";

import { GetUserUploads } from "@/api/user/uploads";

export namespace EditProfileAvatarUploader {
    export type Props = {
        avatar?: string,
        uploads: GetUserUploads.TOutput;
        cropperPageUrl: string;
    };
}

export const EditProfileAvatarUploader = ({
    avatar = "/assets/defaults/avatar.png",
    uploads,
    cropperPageUrl,
}: EditProfileAvatarUploader.Props) => {
    const {
        handlePickAvatar,
        handleDeleteAvatar,
        handleSelectFile,
        uploadDrawerController,
    } = useProfileAvatarUploader(cropperPageUrl);

    return (
        <Controller
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
                    <Avatar image={avatar} variant="edit" />
                </UploadDrawer>
            )}
        />
    );
};