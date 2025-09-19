"use client";

import {
    IImageUploaderConfig,
    IImageUploaderController,
    IImageUploaderStore,
    PixelCropArea,
    PixelCropPoint,
} from "./types";

export class ImageUploaderController implements IImageUploaderController {
    constructor(
        private readonly internalConfig: IImageUploaderConfig,
        private readonly store: IImageUploaderStore,
    ) {}

    setImageSrc(src: string): void {
        this.store.setImageSrc(src);
    }

    changeCrop(crop: PixelCropPoint) {
        if(this.store.zoom === 1 && crop.x < 0 && crop.y < 0) {
            return;
        }
        this.store.setCrop(crop);
    }

    changeZoom(zoom: number) {
        if(zoom === this.internalConfig.cropperMaxZoom) return;
        this.store.setZoom(zoom);
    }

    completeCrop(crop: PixelCropArea) {
        this.store.setCompletedCrop(crop);
    }

    cropImage(): Promise<Blob> {
        return new Promise<Blob>((resolve, reject) => {
            try {
                if(!this.store.imageSrc) throw new Error("No image");
                if(!this.store.completedCrop) throw new Error("No crop");
                resolve(this.getCroppedImage(this.store.imageSrc, this.store.completedCrop));
            } catch(error) {
                reject(error);
            }
        });
    }

    private createImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", error => reject(error));
            image.src = url;
        });
    }

    private async getCroppedImage(imageSrc: string, pixelCrop: PixelCropArea) {
        const image = await this.createImage(imageSrc);

        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        const ctx = canvas.getContext("2d");

        if(!ctx) {
            throw new Error("No 2d context");
        }

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );

        // As a blob
        return new Promise<Blob>((resolve, reject) => {
            const quality = this.calculateCompression(pixelCrop.width, pixelCrop.height);
            canvas.toBlob(file => {
                if(file) {
                    resolve(file);
                } else {
                    reject(new Error("Canvas is empty"));
                }
            }, "image/jpeg", quality);
        });
    }

    private calculateCompression(width: number, height: number, constant = 7973632) {
        const area = width * height;
        return Math.min(constant / area, 1);
    }
}