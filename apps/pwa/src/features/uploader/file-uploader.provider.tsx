"use client";

import { PropsWithChildren, useRef } from "react";
import { FileUploaderContext } from "./file-uploader.context";
import { FileUploaderStore } from "./file-uploader.store";

export namespace FileUploaderProvider {
    export type Props = PropsWithChildren;
}

export const FileUploaderProvider = ({ children }: FileUploaderProvider.Props) => {
    const store = useRef(new FileUploaderStore()).current;

    return (
        <FileUploaderContext.Provider value={{ store }}>
            { children }
        </FileUploaderContext.Provider>
    );
};
