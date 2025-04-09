"use client";

import { Button } from "@/components/ui";
import {
    CropperControls,
    CropperTrigger,
    CropperUploader,
} from "@/components/shared/uploader/cropper";
import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { observer } from "mobx-react-lite";
import { useEventPosterUpload } from "@/features/event/hooks/use-poster-upload.hook";

export namespace EventPosterUploader {
    export type Props = {};
}

export const EventPosterUploader = observer(({ }: EventPosterUploader.Props) => {
    const {
        drawerOpen,
        handleUploadPoster,
    } = useEventPosterUpload();

    return (
        <>
            <Drawer open={drawerOpen} staticPoint={"full"} modal={false}>
                <DrawerBody>
                    <DrawerContent>
                        <CropperControls circularCrop={false} aspect={0} />
                        <CropperTrigger onCropCompleted={handleUploadPoster}>
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