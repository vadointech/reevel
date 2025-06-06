import { PercentCrop, PixelCrop } from "react-image-crop";

export interface IImageUploaderController {
    setImageSrc(src: string): void;
    changeCrop(crop: PercentCrop): void;
    completeCrop(crop: PixelCrop): void;
    cleanUp(): void;
    cropImage(): Promise<Blob | null>;
    centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): PercentCrop;
}