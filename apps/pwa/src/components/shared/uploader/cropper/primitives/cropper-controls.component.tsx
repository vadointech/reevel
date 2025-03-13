"use client";

import { SyntheticEvent } from "react";
import ReactCrop, { PercentCrop, PixelCrop, ReactCropProps } from "react-image-crop";
import { observer } from "mobx-react-lite";
import { useCropperStore } from "@/components/shared/uploader/cropper";
import { centerAspectCrop } from "@/components/shared/uploader/cropper/utils/center-crop";

import "react-image-crop/dist/ReactCrop.css";

export namespace CropperControls {
    export type Props = Omit<ReactCropProps, "onChange" | "style">;
}

export const CropperControls = observer(({
    aspect = 1,
    minWidth = 150,
    circularCrop = true,
    ...props
}: CropperControls.Props) => {
    const store = useCropperStore();

    const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        store.changeCrop(centerAspectCrop(width, height, aspect));
    };

    const handleChangeCrop = (crop: PixelCrop, percentageCrop: PercentCrop) => {
        store.changeCrop(percentageCrop);
    };

    const handleCompleteCrop = (crop: PixelCrop) => {
        store.completeCrop(crop);
    };

    return (
        <>
            <ReactCrop
                crop={store.crop}
                onChange={handleChangeCrop}
                onComplete={handleCompleteCrop}
                keepSelection
                aspect={aspect}
                circularCrop={circularCrop}
                minWidth={minWidth}
                style={{ width: "100%" }}
                {...props}
            >
                <img
                    ref={store.imgRef}
                    src={store.imgSrc}
                    alt={"Crop me"}
                    onLoad={onImageLoad}
                    style={{
                        width: "100%",
                        objectFit: "cover",
                    }}
                />
            </ReactCrop>
            <canvas
                ref={store.previewCanvasRef}
                style={{
                    display: "none",
                    objectFit: "cover",
                    width: "100%",
                }}
            />
        </>
    );
});
