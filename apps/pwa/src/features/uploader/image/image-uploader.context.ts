"use client";

import { createContext, RefObject, useContext } from "react";
import { IImageUploaderController, IImageUploaderStore } from "./types";

type ImageUploaderContextValues = {
    store: IImageUploaderStore;
    controller: IImageUploaderController;
    imageRef: RefObject<HTMLImageElement | null>
    previewCanvasRef: RefObject<HTMLCanvasElement | null>
};

export const ImageUploaderContext = createContext<ImageUploaderContextValues | null>(null);

export function useImageUploaderContext() {
    const ctx = useContext(ImageUploaderContext);
    if (!ctx) throw new Error("useCropper must be used within a CropperProvider");
    return ctx;
}