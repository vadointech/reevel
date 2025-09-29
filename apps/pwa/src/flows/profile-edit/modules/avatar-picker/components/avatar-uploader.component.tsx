"use client";

import { UploadDrawer } from "@/components/drawers/upload";
import { Avatar } from "@/components/ui";

import { GetUserUploads } from "@/api/user/uploads";
import { Controller } from "react-hook-form";
import { useEditProfileAvatarUploader } from "@/features/profile/edit/hooks/use-avatar-uploader.hook";

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
        handleAvatarPick,
        handleAvatarDelete,
        uploadDrawerController,
    } = useEditProfileAvatarUploader();

    return (
        <Controller
            name={"avatar"}
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
                    <Avatar image={avatar} variant="edit" />
                </UploadDrawer>
            )}
        />
    );
};