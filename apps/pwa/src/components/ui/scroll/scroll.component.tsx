"use client";

import { ComponentProps, useEffect } from "react";

import useEmblaCarousel from "embla-carousel-react";
import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Scroll {
    export type Variant = "horizontal" | "vertical";
    export type Props = Omit<ComponentProps<"div">, "onChange"> & {
        variant?: Variant;
        size?: UISize;
        dragFree?: boolean;
        startIndex?: number;
        onChange?: (index: number) => void;
    };
}

export const Scroll = ({
    variant = "horizontal",
    size = "default",
    className,
    children,

    dragFree = true,
    startIndex = 0,
    onChange,

    ...props
}: Scroll.Props) => {

    const [ref, emblaApi] = useEmblaCarousel({
        dragFree,
        startIndex,
    });

    useEffect(() => {
        if(!emblaApi) return;

        emblaApi.on("pointerUp", (api) => {
            onChange?.(api.selectedScrollSnap());
        });
    }, [emblaApi, onChange]);

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
