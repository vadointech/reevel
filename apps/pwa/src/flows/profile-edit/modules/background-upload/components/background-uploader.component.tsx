"use client";

import { GetUserUploads } from "@/api/user/uploads";
import { Controller } from "react-hook-form";

import { ProfileHeroCover } from "@/flows/profile/modules/hero/primitives";

export namespace EditProfileBackGroundUploader {
    export type Props = {
        background?: string,
        uploads?: GetUserUploads.TOutput;
        cropperPageUrl: string;
    };
}

export const EditProfileBackGroundUploader = ({
    background = "/assets/defaults/background.png",
}: EditProfileBackGroundUploader.Props) => {
    // const {
    //     handlePickBackground,
    //     handleDeleteBackground,
    //     handleSelectFile,
    //     uploadDrawerController,
    // } = useEditProfileBackGroundUploader(cropperPageUrl);

    return (
        <Controller
            name={"background"}
            render={() => (
                // <UploadDrawer
                //     title={Profile background}
                //     uploads={uploads}
                //     gridVariant={"rounded"}
                //     selectedImageUrl={field.value}
                //     onImagePick={handlePickAvatar}
                //     onImageDelete={handleDeleteAvatar}
                //     onFileSelect={handleSelectFile}
                //     controller={uploadDrawerController}
                // >
                <ProfileHeroCover
                    image={background}
                />
                // </UploadDrawer>
            )}
        />
    );
};