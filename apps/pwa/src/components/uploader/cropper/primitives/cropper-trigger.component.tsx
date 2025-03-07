"use client";

import { useCropperContext } from "../context";
import { ComponentProps } from "react";

export namespace CropperTrigger {
    export type Props = ComponentProps<"div">;
}

export const CropperTrigger = ({ ...props }: CropperTrigger.Props) => {
    const { handleCropImage } = useCropperContext();

    return (
        <div
            {...props}
            onClick={handleCropImage}
        />
    );
};
