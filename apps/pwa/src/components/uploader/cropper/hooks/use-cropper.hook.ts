"use client";

import { Crop, PercentCrop, PixelCrop } from "react-image-crop";
import { SyntheticEvent, useCallback, useRef, useState } from "react";
import { canvasPreview } from "../utils/canvas-preview";
import { centerAspectCrop } from "../utils/center-crop";
import { getCroppedImage } from "../utils/get-cropped-image";

type Params = {
    aspect: number;
    onCropCompleted: (blob: Blob) => void;
};

export function useCropper({
    aspect,
    onCropCompleted,
}: Params) {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const [imgSrc, setImgSrc] = useState<string>("");
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

    const onFileUpload = useCallback((src: string) => {
        setCrop(undefined);
        setImgSrc(src);
    }, []);

    const onCropChange = useCallback((crop: PixelCrop, percentCrop: PercentCrop) => {
        setCrop(percentCrop);
    }, []);

    const onCropComplete = useCallback((crop: PixelCrop) => {
        setCompletedCrop(crop);
    }, []);

    const onImageLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspect));
    }, []);

    const handleCropImage = () => {
        if (imgRef.current && completedCrop) {
            try {
                canvasPreview(imgRef, previewCanvasRef, completedCrop)
                    .then(() => getCroppedImage(imgRef, previewCanvasRef, completedCrop))
                    .then(onCropCompleted);
            } catch (e) {
                console.error("Error cropping image:", e);
            }
        }
    };

    return {
        crop,
        imgSrc,
        imgRef,
        previewCanvasRef,
        completedCrop,

        onFileUpload,

        onImageLoad,
        onCropChange,
        onCropComplete,
        handleCropImage,
    };
}