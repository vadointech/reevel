import Image from "next/image";
import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";
import IconCamera from "@/components/icons/camera";

export namespace Avatar {
    export type Variant = "default" | "outline" | "bordered" | "edit";
    export type Props = ComponentProps<"div"> & {
        image?: string;
        variant?: Variant;
        size?: number;
    };
}

export const Avatar = ({
    image,
    variant = "default",
    size,
    className,
    style,
    ...props
}: Avatar.Props) => {
    return (
        <div
            className={cx(
                styles.avatar,
                styles[`avatar__variant_${variant}`],
                className,
            )}
            style={{ height: size, ...style }}
            {...props}
        >
            {variant === "edit"
                ? <div className={styles[`avatar__variant_${variant}`]}>
                    <IconCamera />
                </div>
                : null
            }
            <Image
                fill
                src={image || ""}
                alt={"User Avatar"}
            />
        </div>
    );
};
