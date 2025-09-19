import { PixelCropArea, PixelCropPoint } from "@/features/uploader/image/types/store";

export interface IImageUploaderController {
    setImageSrc(src: string): void;
    changeCrop(crop: PixelCropPoint): void;
    changeZoom(zoom: number): void;
    completeCrop(crop: PixelCropArea): void;
    cropImage(): Promise<Blob>;
}