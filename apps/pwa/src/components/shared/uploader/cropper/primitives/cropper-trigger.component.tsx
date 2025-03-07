"use client";

import { ComponentProps } from "react";
import { observer } from "mobx-react-lite";
import { useCropperStore } from "@/components/shared/uploader/cropper";

export namespace CropperTrigger {
    export type Props = ComponentProps<"div"> & {
        onCropCompleted?: (blob: Blob) => void;
    };
}

export const CropperTrigger = observer(({
    onCropCompleted,
    ...props
}: CropperTrigger.Props) => {
    const store = useCropperStore();

    const handleCropImage = () => {
        store.cropImage(onCropCompleted);
    };

    return (
        <div
            {...props}
            onClick={handleCropImage}
        />
    );
});
