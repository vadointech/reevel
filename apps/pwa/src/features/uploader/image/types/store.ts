import { Crop, PixelCrop } from "react-image-crop";
import { IMobxStore } from "@/lib/mobx/types";

export interface IImageUploaderStore extends IMobxStore {
    imageSrc?: string;
    crop?: Crop;
    completedCrop?: PixelCrop;

    setImageSrc(src?: string): void;
    setCrop(crop?: Crop): void;
    setCompletedCrop(crop?: PixelCrop): void;
}