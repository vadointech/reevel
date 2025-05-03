import Image from "next/image";
import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Avatar {
    export type Variant = "default" | "outline";
    export type Props = ComponentProps<"div"> & {
        image?: string;
        variant?: Variant;
    };
}

export const Avatar = ({
    image,
    variant = "default",
    className,
    ...props
}: Avatar.Props) => {
    return (
        <div
            className={cx(
                styles.avatar,
                styles[`avatar__variant_${variant}`],
                className,
            )}
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
