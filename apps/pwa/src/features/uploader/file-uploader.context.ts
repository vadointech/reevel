"use client";

import { IFileUploaderStore } from "./types";
import { createContext, useContext } from "react";

type FileUploaderContextValues = {
    store: IFileUploaderStore
};

export const FileUploaderContext = createContext<FileUploaderContextValues | null>(null);

export function useFileUploaderContext() {
    const ctx = useContext(FileUploaderContext);
    if(!ctx) {
        throw new Error("useFileUploaderContext should be used within the FileUploaderContext provider");
    }
    return ctx;
}