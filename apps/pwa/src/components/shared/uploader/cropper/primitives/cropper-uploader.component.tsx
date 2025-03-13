"use client";

import { FileUploader } from "@/components/shared/uploader";
import { useCropperStore } from "@/components/shared/uploader/cropper";
import { observer } from "mobx-react-lite";

export namespace CropperUploader {
    export type Props = FileUploader.Props;
}

export const CropperUploader = observer(({ ...props }: CropperUploader.Props) => {
    const store = useCropperStore();

    const handleFileUpload = (src: string) => {
        store.changeCrop(undefined);
        store.changeImageSrc(src);
    };

    return (
        <FileUploader {...props} onFileUpload={handleFileUpload} />
    );
});
