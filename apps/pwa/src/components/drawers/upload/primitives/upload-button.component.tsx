import { ComponentProps } from "react";

import { IconPicture } from "@/components/icons";

import styles from "../styles.module.scss";
import { cx } from "class-variance-authority";

export namespace UploadFileButton {
    export type Props = ComponentProps<"button">;
}

export const UploadFileButton = ({
    className,
    ...props
}: UploadFileButton.Props) => {
    return (
        <div>
            <button
                className={cx(
                    styles.upload__button,
                    className,
                )}
                {...props}
            >
                <IconPicture />
                Upload
            </button>
        </div>
    );
};
