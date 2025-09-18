import { IMobxStore } from "@/lib/mobx/types";

export interface PixelCropPoint {
    x: number;
    y: number;
};

export interface PixelCropArea extends PixelCropPoint{
    width: number;
    height: number;
}

export interface IImageUploaderStore extends IMobxStore {
    imageSrc: string | undefined;
    crop: PixelCropPoint;
    completedCrop: PixelCropArea | undefined;
    zoom: number;

    setImageSrc(src?: string): void;
    setCrop(crop?: PixelCropPoint): void;
    setZoom(zoom: number): void;
    setCompletedCrop(crop?: PixelCropArea): void;
}