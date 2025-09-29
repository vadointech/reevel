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
        handleBackGroundPick,
        handleBackGroundDelete,
        uploadDrawerController,
    } = useEditProfileBackGroundUploader();

    return (
        <Controller
            name={"background"}
            render={({ field }) => (
                <UploadDrawer
                    uploads={uploads}
                    gridVariant={"rounded"}
                    cropperPageUrl={cropperPageUrl}
                    selectedImageUrl={field.value}
                    onImagePick={handleBackGroundPick}
                    onImageDelete={handleBackGroundDelete}
                    controller={uploadDrawerController}
                >
                    <ProfileHeroCover image={background} onChangeBackground />
                </UploadDrawer>
            )}
        />
    );
};