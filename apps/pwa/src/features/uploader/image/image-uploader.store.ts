"use client";

import { IImageUploaderStore, PixelCropArea, PixelCropPoint } from "./types";
import { action, makeObservable, observable } from "mobx";

export class ImageUploaderStore implements IImageUploaderStore {
    imageSrc: string | undefined = undefined;

    crop: PixelCropPoint = { x: 0, y: 0 };
    zoom: number = 1;
    completedCrop: PixelCropArea | undefined = undefined;

    constructor() {
        makeObservable(this, {
            imageSrc: observable,
            crop: observable,
            zoom: observable,

            setImageSrc: action,
            setCrop: action,
            setZoom: action,
        });
    }

    dispose() {
        this.imageSrc = undefined;
        this.crop = { x: 0, y: 0 };
        this.completedCrop = undefined;
    }

    setImageSrc(src?: string) {
        this.imageSrc = src;
    }

    setCrop(crop: PixelCropPoint) {
        this.crop = crop;
    }

    setZoom(zoom: number) {
        this.zoom = zoom;
    }

    setCompletedCrop(crop?: PixelCropArea) {
        this.completedCrop = crop;
    }
}