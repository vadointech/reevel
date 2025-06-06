"use client";

import { IImageUploaderStore } from "./types";
import { action, makeObservable, observable } from "mobx";
import { Crop, PixelCrop } from "react-image-crop";

export class ImageUploaderStore implements IImageUploaderStore {
    imageSrc?: string = undefined;

    crop?: Crop = undefined;
    completedCrop?: PixelCrop = undefined;

    constructor() {
        makeObservable(this, {
            imageSrc: observable,
            crop: observable,

            setImageSrc: action,
            setCrop: action,
        });
    }

    dispose() {}

    setImageSrc(src?: string) {
        this.imageSrc = src;
    }

    setCrop(crop?: Crop) {
        this.crop = crop;
    }

    setCompletedCrop(crop?: PixelCrop) {
        this.completedCrop = crop;
    }
}