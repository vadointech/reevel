import { ComponentProps } from "react";

import Image from "next/image";

import styles from "../styles.module.scss";
import { cx } from "class-variance-authority";
import { CloseButton } from "@/components/shared/_redesign/close-button";

export namespace UploadFileItem {
    type Data = {
        image: string;
    };
    export type Props = ComponentProps<"div"> & Data & {
        selected?: boolean;
    };
}

export const UploadFileItem = ({
    className,
    selected = false,
    image,
    ...props
}: UploadFileItem.Props) => {
    return (
        <div
            className={cx(
                styles.upload__file,
                selected && styles.upload__file_selected,
                className,
            )}
            {...props}
        >
            <div className={styles.upload__file_wrapper}>
                <Image
                    fill
                    src={image}
                    alt={"poster"}
                />
                <div>
                    <CloseButton size={"small"} />
                </div>
            </div>
        </div>
    );
};
