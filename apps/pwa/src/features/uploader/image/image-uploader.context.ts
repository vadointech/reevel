"use client";

import { createContext, useContext } from "react";
import { IImageUploaderConfig, IImageUploaderController, IImageUploaderStore } from "./types";

type ImageUploaderContextValues = {
    store: IImageUploaderStore;
    config: IImageUploaderConfig;
    controller: IImageUploaderController;
};

export const ImageUploaderContext = createContext<ImageUploaderContextValues | null>(null);

export function useImageUploaderContext() {
    const ctx = useContext(ImageUploaderContext);
    if (!ctx) throw new Error("useCropper must be used within a CropperProvider");
    return ctx;
}