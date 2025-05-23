"use client";

import Image from "next/image";
import { ComponentProps } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace CardCarouselSet {

    export type Data = {
        src: string | StaticImport;
    };

    export type Props = ComponentProps<"div"> & {
        data: Data[];
    };

}


export const CardCarouselSet = ({ data, className, ...props }: CardCarouselSet.Props) => {

    return (
        <div
            className={cx(
                styles.carousel,
                className,
            )}

            {...props}
        >
            <div
                className={styles.carousel__root}
            >
                <div
                    className={styles.carousel__container}
                >
                    {
                        data.map((item, index) => (
                            <div
                                key={index}
                                className={cx(
                                    styles.carousel__slide,
                                )}
                            >
                                <Image
                                    fill
                                    src={item.src}
                                    alt="Franchise logo"
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};