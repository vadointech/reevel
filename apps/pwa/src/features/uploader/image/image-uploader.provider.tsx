"use client";

import { PropsWithChildren } from "react";

import { ImageUploaderContext } from "./image-uploader.context";
import { ImageUploaderController } from "./image-uploader.controller";
import { ImageUploaderStore } from "./image-uploader.store";
import { ImageUploaderConfig } from "./image-uploader.config";
import { useMobxStore } from "@/lib/mobx";
import { useSingleton } from "@/hooks";
import { ImageUploaderConfigParams } from "./types";

export namespace ImageUploaderProvider {
    export type Props = PropsWithChildren<ImageUploaderConfigParams>;
}

export const ImageUploaderProvider = ({
    children,
    ...configParams
}: ImageUploaderProvider.Props) => {
    const config = useSingleton(ImageUploaderConfig, configParams);
    const store = useMobxStore(ImageUploaderStore);
    const controller = useSingleton(
        ImageUploaderController,
        config,
        store,
    );

    return (
        <ImageUploaderContext.Provider
            value={{
                store,
                config,
                controller,
            }}
        >
            { children }
        </ImageUploaderContext.Provider>
    );
};