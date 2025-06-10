"use client";

import { observer } from "mobx-react-lite";
import ReactCrop, { ReactCropProps } from "react-image-crop";
import { useImageUploaderContext } from "@/features/uploader/image";
import { useImageCropper } from "@/features/uploader/image/hooks";

import "react-image-crop/dist/ReactCrop.css";

export namespace ImageCropper {
    export type Props = Omit<ReactCropProps, "onChange" | "style">;
}

export const ImageCropper = observer(({
    aspect = 1,
    minWidth = 150,
    ...props
}: ImageCropper.Props) => {
    const {
        store,
        imageRef,
        previewCanvasRef,
    } = useImageUploaderContext();

    const {
        handleImageLoad,
        handleChangeCrop,
        handleCompleteCrop,
    } = useImageCropper(aspect);

    return (
        <>
            <ReactCrop
                crop={store.crop}
                onChange={handleChangeCrop}
                onComplete={handleCompleteCrop}
                keepSelection
                aspect={aspect}
                minWidth={minWidth}
                style={{ width: "100%" }}
                {...props}
            >
                {
                    store.imageSrc ? (
                        <img
                            ref={imageRef}
                            src={store.imageSrc}
                            alt={"Image Crop"}
                            onLoad={handleImageLoad}
                            style={{ width: "100%", objectFit: "cover" }}
                        />
                    ) : null
                }
            </ReactCrop>
            <canvas
                ref={previewCanvasRef}
                style={{ display: "none", objectFit: "cover", width: "100%" }}
            />
        </>
    );
});
