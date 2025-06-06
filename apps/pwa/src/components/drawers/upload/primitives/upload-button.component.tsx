"use client";

import { ComponentProps } from "react";
import { useRouter } from "@/i18n/routing";
import { useImageUploader } from "@/features/uploader/image/hooks";

import { Input } from "@/components/shared/_redesign";
import { IconPicture } from "@/components/icons";

import styles from "../styles.module.scss";

export namespace UploadFileButton {
    export type Props = ComponentProps<"input">;
}

export const UploadFileButton = ({
    ...props
}: UploadFileButton.Props) => {
    const router = useRouter();

    const { handleSelectFile } = useImageUploader({
        onFileSelected: () => router.push("/event/create/preview/upload"),
    });

    return (
        <Input.File
            label={"Upload"}
            accept={"image/png, image/jpeg, image/webp"}
            onChange={handleSelectFile}
            icon={<IconPicture />}
            variant={"accent-muted"}
            className={styles.upload}
            {...props}
        />
    );
};
