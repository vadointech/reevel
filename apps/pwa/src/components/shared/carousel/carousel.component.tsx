import { ComponentProps } from "react";
import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Carousel {
    export type Props = ComponentProps<"div"> & {
        size?: UISize
    };
}

export const Carousel = ({
    size = "default",
    className,
    ...props
}: Carousel.Props) => {
    return (
        <div
            className={cx(
                styles.carousel,
                styles[`carousel__size_${size}`],
                className,
            )}
            {...props}
        />
    );
};
