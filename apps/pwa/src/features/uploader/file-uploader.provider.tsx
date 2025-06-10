"use client";

import { PropsWithChildren, useMemo } from "react";
import { FileUploaderContext } from "./file-uploader.context";
import { FileUploaderStore } from "./file-uploader.store";
import { useFormContext } from "react-hook-form";

export namespace FileUploaderProvider {
    export type Props = PropsWithChildren<{
        syncFormField?: string;
    }>;
}

export const FileUploaderProvider = ({ children, ...config }: FileUploaderProvider.Props) => {
    const form = useFormContext();

    const initFileUploaderStore: ConstructorParameters<typeof FileUploaderStore> = useMemo(() => {
        if(!config.syncFormField) return [];
        return [
            (value) => {
                if(config.syncFormField && form) {
                    form.setValue(config.syncFormField, value?.secure_url);
                }
            },
        ];
    }, [config.syncFormField]);

    const store = useMemo(() =>
        new FileUploaderStore(...initFileUploaderStore), [initFileUploaderStore],
    );

    return (
        <FileUploaderContext.Provider value={{ store }}>
            { children }
        </FileUploaderContext.Provider>
    );
};
