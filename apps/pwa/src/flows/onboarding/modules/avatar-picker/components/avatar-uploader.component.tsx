"use client";

import { Button } from "@/components/shared/_redesign";
import { useOnboardingAvatarUploader } from "@/features/onboarding/hooks";
import { UploadDrawer } from "@/components/drawers/upload";
import { GetUserUploads } from "@/api/user/uploads";
import { observer } from "mobx-react-lite";

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
        sessionStore,
        handleAvatarPick,
        handleAvatarDelete,
        uploadDrawerController,
    } = useOnboardingAvatarUploader();

    return (
        <UploadDrawer
            uploads={uploads}
            gridVariant={"rounded"}
            cropperPageUrl={cropperPageUrl}
            selectedImageUrl={sessionStore.user?.profile?.picture}
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