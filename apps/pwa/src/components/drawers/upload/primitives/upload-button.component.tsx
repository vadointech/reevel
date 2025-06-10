"use client";

import { ComponentProps } from "react";

import { Input } from "@/components/shared/_redesign";
import { IconPicture } from "@/components/icons";

export namespace UploadFileButton {
    export type Props = ComponentProps<"input">;
}

export const UploadFileButton = (props: UploadFileButton.Props) => {
    return (
        <Input.File
            label={"Upload"}
            accept={"image/png, image/jpeg, image/webp"}
            icon={<IconPicture />}
            variant={"accent-muted"}
            {...props}
        />
    );
};
