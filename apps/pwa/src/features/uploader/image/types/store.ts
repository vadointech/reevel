import { MobxStore } from "@/types/common";
import { Crop, PixelCrop } from "react-image-crop";

export interface IImageUploaderStore extends MobxStore {
    imageSrc?: string;
    crop?: Crop;
    completedCrop?: PixelCrop;

    setImageSrc(src?: string): void;
    setCrop(crop?: Crop): void;
    setCompletedCrop(crop?: PixelCrop): void;
}