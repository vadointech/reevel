"use client";

import { Button } from "@/components/ui";
import {
    CropperControls,
    CropperTrigger,
    CropperUploader,
} from "@/components/shared/uploader/cropper";
import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { observer } from "mobx-react-lite";
import { useAvatarUpload } from "@/features/onboarding";

export namespace OnboardingPhotoUploader {
    export type Props = {};
}

export const OnboardingPhotoUploader = observer(({}: OnboardingPhotoUploader.Props) => {
    const {
        drawerOpen,
        handleUploadAvatar,
    } = useAvatarUpload();

    return (
        <>
            <Drawer open={drawerOpen} staticPoint={"full"} modal={false}>
                <DrawerBody>
                    <DrawerContent>
                        <CropperControls />
                        <CropperTrigger onCropCompleted={handleUploadAvatar}>
                            <Button>
                                Save photo
                            </Button>
                        </CropperTrigger>
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
            <CropperUploader>
                <Button>
                    Upload custom photo
                </Button>
            </CropperUploader>
        </>
    );
});