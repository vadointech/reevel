import { ComponentProps } from "react";

import Image from "next/image";

import styles from "../styles.module.scss";
import { cx } from "class-variance-authority";
import { CloseButton } from "@/components/shared/_redesign/close-button";

export namespace UploadFileItem {
    type Data = {
        imageUrl: string;
    };
    export type Props = ComponentProps<"div"> & Data & {
        selected?: boolean;
        onDelete?: () => void;
    };
}

export const UploadFileItem = ({
    imageUrl,
    selected = false,
    onDelete,
    className,
    ...props
}: UploadFileItem.Props) => {
    return (
        <div
            className={cx(
                styles.upload__file,
                selected && styles.upload__file_selected,
                className,
            )}
        >
            <div
                className={styles.upload__file_wrapper}
                {...props}
            >
                <Image
                    fill
                    src={imageUrl}
                    alt={"poster"}
                />
            </div>
            <div className={styles.upload__file_delete} onClick={onDelete}>
                <CloseButton size={"small"} />
            </div>
        </div>
    );
};
