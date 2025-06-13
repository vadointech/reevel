import Image from "next/image";
import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Avatar {
    export type Variant = "default" | "outline" | "bordered";
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
            <Image
                fill
                src={image || ""}
                alt={"User Avatar"}
            />
        </div>
    );
};
