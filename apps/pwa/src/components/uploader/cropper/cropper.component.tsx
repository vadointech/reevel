"use client";

import { memo, ReactNode } from "react";
import ReactCrop from "react-image-crop";
import { CropperContext } from "./context";
import { useCropper } from "./hooks/use-cropper.hook";
import { FileUploader } from "@/components/uploader";

import "react-image-crop/dist/ReactCrop.css";

export namespace Cropper {
    export type Props = {
        children?: ReactNode;
        aspect?: number;
        minWidth?: number;
        circular?: boolean;
        onCropCompleted?: (blob: Blob) => void;
    };
}

export const Cropper = memo(({
    children,
    aspect = 1,
    minWidth = 150,
    circular = true,
    onCropCompleted = () => {},
}: Cropper.Props) => {
    const {
        crop,
        imgSrc,
        imgRef,
        previewCanvasRef,

        onImageLoad,
        onCropChange,
        onCropComplete,
        onFileUpload,

        handleCropImage,
    } = useCropper({ aspect, onCropCompleted });

    return (
        <CropperContext.Provider value={{ handleCropImage }}>
            <FileUploader onFileUpload={onFileUpload} />
            {
                imgSrc ? (
                    <ReactCrop
                        crop={crop}
                        onChange={onCropChange}
                        onComplete={onCropComplete}
                        keepSelection
                        aspect={aspect}
                        circularCrop={circular}
                        minWidth={minWidth}
                        style={{ width: "100%" }}
                    >
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            alt={"Crop me"}
                            onLoad={onImageLoad}
                            style={{
                                width: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </ReactCrop>
                ) : null
            }

            { children }

            <canvas
                ref={previewCanvasRef}
                style={{
                    display: "none",
                    objectFit: "cover",
                    width: "100%",
                }}
            />
        </CropperContext.Provider>
    );
});
