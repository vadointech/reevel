"use client";

import { ComponentProps } from "react";

import useEmblaCarousel from "embla-carousel-react";
import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Scroll {
    export type Variant = "horizontal" | "vertical";
    export type Props = ComponentProps<"div"> & {
        variant?: Variant;
        size?: UISize;
    };
}

export const Scroll = ({
    variant = "horizontal",
    size = "default",
    className,
    children,
    ...props
}: Scroll.Props) => {

    const [ref] = useEmblaCarousel({
        dragFree: true,
    });

    return (
        <div
            ref={ref}
            className={styles.scroll}
        >
            <div
                className={cx(
                    styles[`scroll_variant_${variant}`],
                    styles[`scroll_size_${size}`],
                    className,
                )}
                {...props}
            >
                { children }
            </div>
        </div>
    );
};
