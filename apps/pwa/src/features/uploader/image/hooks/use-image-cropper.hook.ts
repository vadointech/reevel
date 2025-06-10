"use client";

import { SyntheticEvent, useCallback } from "react";
import { useImageUploaderContext } from "../image-uploader.context";
import { PercentCrop, PixelCrop } from "react-image-crop";

type Params = {
    onCropSuccess?: (blob: Blob | null) => void;
};

export function useImageCropper(aspectRatio: number = 1, params: Params = {}) {
    const { controller } = useImageUploaderContext();

    const handleCrop = useCallback(() => {
        controller.cropImage().then(params.onCropSuccess);
    }, []);

    const handleImageLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        controller.changeCrop(
            controller.centerAspectCrop(width, height, aspectRatio),
        );
    }, []);

    const handleChangeCrop = useCallback((crop: PixelCrop, percentageCrop: PercentCrop) => {
        controller.changeCrop(percentageCrop);
    }, []);

    const handleCompleteCrop = useCallback((crop: PixelCrop) => {
        controller.completeCrop(crop);
    }, []);

    return {
        handleCrop,
        handleImageLoad,
        handleChangeCrop,
        handleCompleteCrop,
    };
}