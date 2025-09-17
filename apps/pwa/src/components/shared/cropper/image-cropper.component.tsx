"use client";

import { observer } from "mobx-react-lite";
import Cropper, { CropperProps } from "react-easy-crop";
import { useImageUploaderContext } from "@/features/uploader/image";

export namespace ImageCropper {
    export type Props = Partial<Omit<CropperProps, "maxZoom" | "minZoom">>;
}

export const ImageCropper = observer(({
    aspect = 1,
    showGrid = false,
    ...props
}: ImageCropper.Props) => {
    const { store, controller, config } = useImageUploaderContext();

    return (
        <Cropper
            image={store.imageSrc}
            crop={store.crop}
            zoom={store.zoom}
            onCropChange={(point) => controller.changeCrop(point)}
            onZoomChange={(zoom) => controller.changeZoom(zoom)}
            onCropComplete={(_croppedArea, croppedAreaPixels) => controller.completeCrop(croppedAreaPixels)}
            aspect={aspect}
            showGrid={showGrid}
            objectFit={"horizontal-cover"}
            minZoom={1}
            maxZoom={config.cropperMaxZoom}
            zoomSpeed={10}
            {...props}
        />
    );
});
