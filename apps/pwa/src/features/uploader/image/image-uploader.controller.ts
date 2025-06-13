"use client";

import { RefObject } from "react";
import { IImageUploaderController, IImageUploaderStore } from "./types";
import { centerCrop, makeAspectCrop, PercentCrop, PixelCrop } from "react-image-crop";

export class ImageUploaderController implements IImageUploaderController {
    private readonly _store: IImageUploaderStore;

    private readonly _imageRef: RefObject<HTMLImageElement | null>;
    private readonly _previewCanvasRef: RefObject<HTMLCanvasElement | null>;

    constructor(
        store: IImageUploaderStore,
        imageRef: RefObject<HTMLImageElement | null>,
        previewCanvasRef: RefObject<HTMLCanvasElement | null>,
    ) {
        this._store = store;
        this._imageRef = imageRef;
        this._previewCanvasRef = previewCanvasRef;
    }

    setImageSrc(src: string): void {
        this._store.setImageSrc(src);
    }

    changeCrop(crop: PercentCrop) {
        this._store.setCrop(crop);
    }

    completeCrop(crop: PixelCrop) {
        this._store.setCompletedCrop(crop);
    }

    cleanUp() {
        this._store.setCrop(undefined);
        this._store.setImageSrc(undefined);
        this._store.setCompletedCrop(undefined);
    }

    centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): PercentCrop {
        return centerCrop(
            makeAspectCrop(
                { unit: "%", width: 75 },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        );
    }

    async cropImage(): Promise<Blob | null> {
        if(!this._imageRef.current) return null;
        if(!this._store.completedCrop) return null;
        try {
            return this.canvasPreview(this._store.completedCrop)
                .then(() => this.getCroppedImage(this._store.completedCrop));
        } catch {
            return null;
        }
    }

    private async canvasPreview(crop: PixelCrop) {
        const image = this._imageRef.current;
        const canvas = this._previewCanvasRef.current;

        if (!image || !canvas) {
            throw new Error("Crop canvas does not exist");
        }

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("No 2d context");
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        // devicePixelRatio slightly increases sharpness on retina devices
        // at the expense of slightly slower render times and needing to
        // size the image back down if you want to download/uploads and be
        // true to the image natural size.
        const pixelRatio = window.devicePixelRatio;
        // const pixelRatio = 1;

        canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = "high";

        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;

        const centerX = image.naturalWidth / 2;
        const centerY = image.naturalHeight / 2;

        ctx.save();

        // 3) Move the crop origin to the canvas origin (0,0)
        ctx.translate(-cropX, -cropY);
        // 2) Move the origin to the center of the original position
        ctx.translate(centerX, centerY);
        // 1) Move the center of the image to the origin (0,0)
        ctx.translate(-centerX, -centerY);
        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
        );

        ctx.restore();
    }

    private getCroppedImage(completedCrop?: PixelCrop): Promise<Blob> {
        const image = this._imageRef.current;
        const previewCanvas = this._previewCanvasRef.current;

        if (!image || !previewCanvas || !completedCrop) {
            throw new Error("Crop canvas does not exist");
        }

        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
        );
        const ctx = offscreen.getContext("2d");
        if (!ctx) {
            throw new Error("No 2d context");
        }

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height,
        );

        const quality = this.calculateCompression(image.width, image.height);
        return offscreen.convertToBlob({
            type: "image/jpeg",
            quality: quality,
        });
    }

    private calculateCompression(width: number, height: number, constant = 7973632) {
        const area = width * height;
        return Math.min(constant / area, 1);
    }
}