"use client";

import { RefObject } from "react";
import { Crop, PercentCrop, PixelCrop } from "react-image-crop";
import { createMobxStore } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";
import { canvasPreview } from "@/components/shared/uploader/cropper/utils/canvas-preview";
import { getCroppedImage } from "@/components/shared/uploader/cropper/utils/get-cropped-image";

class CropperStore {
    imgRef: RefObject<HTMLImageElement | null> = { current: null };
    previewCanvasRef: RefObject<HTMLCanvasElement | null> = { current: null };

    imgSrc?: string = undefined;
    crop?: Crop = undefined;
    completedCrop?: PixelCrop = undefined;

    constructor() {
        makeObservable(this, {
            imgRef: observable,
            previewCanvasRef: observable,
            imgSrc: observable,
            crop: observable,
            completedCrop: observable,

            changeImageSrc: action,
            changeCrop: action,
            completeCrop: action,
            cropImage: action,
            cleanup: action,
        });
    }

    changeImageSrc(src?: string) {
        this.imgSrc = src;
    }

    changeCrop(percentCrop?: PercentCrop) {
        this.crop = percentCrop;
    }

    completeCrop(crop?: PixelCrop) {
        this.completedCrop = crop;
    }

    cropImage(onCropCompleted?: (blob: Blob) => void) {
        if (this.imgRef.current && this.completedCrop) {
            try {
                canvasPreview(this.imgRef, this.previewCanvasRef, this.completedCrop)
                    .then(() => getCroppedImage(this.imgRef, this.previewCanvasRef, this.completedCrop))
                    .then(onCropCompleted);
            } catch (e) {
                console.error("Error cropping image:", e);
            }
        }
    }

    cleanup() {
        this.imgSrc = undefined;
        this.crop = undefined;
        this.completedCrop = undefined;
    }
}

export const [useCropperStore] = createMobxStore(CropperStore);