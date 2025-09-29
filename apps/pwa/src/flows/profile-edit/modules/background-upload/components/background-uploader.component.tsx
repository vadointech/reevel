"use client";

import { UploadDrawer } from "@/components/drawers/upload";

import { GetUserUploads } from "@/api/user/uploads";
import { Controller } from "react-hook-form";

import { ProfileHeroCover } from "@/flows/profile/modules/hero/primitives";
import { useEditProfileBackGroundUploader } from "@/features/profile/edit/hooks";

export namespace EditProfileBackGroundUploader {
    export type Props = {
        background?: string,
        uploads: GetUserUploads.TOutput;
        cropperPageUrl: string;
    };
}

export const EditProfileBackGroundUploader = ({
    background = "/assets/defaults/avatar.png",
    uploads,
    cropperPageUrl,
}: EditProfileBackGroundUploader.Props) => {
    const {
        handlePickAvatar,
        handleDeleteAvatar,
        handleSelectFile,
        uploadDrawerController,
    } = useEditProfileBackGroundUploader(cropperPageUrl);

    return (
        <Controller
            name={"background"}
            render={({ field }) => (
                <UploadDrawer
                    uploads={uploads}
                    gridVariant={"rounded"}
                    selectedImageUrl={field.value}
                    onImagePick={handlePickAvatar}
                    onImageDelete={handleDeleteAvatar}
                    onFileSelect={handleSelectFile}
                    controller={uploadDrawerController}
                >
                    <ProfileHeroCover
                        image={background}
                        onChangeBackground
                    />
                </UploadDrawer>
            )}
        />
    );
};