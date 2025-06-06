"use client";

import { PropsWithChildren, useRef } from "react";

import { ImageUploaderContext } from "./image-uploader.context";
import { ImageUploaderController } from "./image-uploader.controller";
import { ImageUploaderStore } from "./image-uploader.store";

export namespace ImageUploaderProvider {
    export type Props = PropsWithChildren;
}

export const ImageUploaderProvider = ({ children }: ImageUploaderProvider.Props) => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const store = useRef(new ImageUploaderStore()).current;
    const controller = useRef(
        new ImageUploaderController(
            store,
            imageRef,
            previewCanvasRef,
        ),
    ).current;

    return (
        <ImageUploaderContext.Provider
            value={{
                store,
                controller,
                imageRef,
                previewCanvasRef,
            }}
        >
            { children }
        </ImageUploaderContext.Provider>
    );
};