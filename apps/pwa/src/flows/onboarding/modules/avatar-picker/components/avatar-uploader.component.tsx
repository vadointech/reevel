"use client";

import { observer } from "mobx-react-lite";

import { useOnboardingAvatarUploader } from "@/features/onboarding/hooks";

import { UploadDrawer } from "@/components/drawers/upload";
import { Button } from "@/components/ui";

import { GetUserUploads } from "@/api/user/uploads";

export namespace OnboardingPhotoUploader {
    export type Props = {
        uploads: GetUserUploads.TOutput;
        cropperPageUrl: string;
    };
}

export const OnboardingPhotoUploader = observer(({
    uploads,
    cropperPageUrl,
}: OnboardingPhotoUploader.Props) => {
    const {
        form,
        handleAvatarPick,
        handleAvatarDelete,
        uploadDrawerController,
    } = useOnboardingAvatarUploader();

    return (
        <UploadDrawer
            uploads={uploads}
            gridVariant={"rounded"}
            cropperPageUrl={cropperPageUrl}
            selectedImageUrl={form.store.pictureToSelect}
            onImagePick={handleAvatarPick}
            onImageDelete={handleAvatarDelete}
            controller={uploadDrawerController}
        >
            <Button variant={"accent-muted"}>
                Upload custom photo
            </Button>
        </UploadDrawer>
    );
});