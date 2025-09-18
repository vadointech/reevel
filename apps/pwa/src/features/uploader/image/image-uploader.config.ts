import { IImageUploaderConfig, ImageUploaderConfigParams } from "./types";
import { constructorInit } from "@/lib/init";

export class ImageUploaderConfig implements IImageUploaderConfig {
    cropperMaxZoom: number = 6;

    constructor(params: ImageUploaderConfigParams = {}) {
        constructorInit(this, params);
    }
}