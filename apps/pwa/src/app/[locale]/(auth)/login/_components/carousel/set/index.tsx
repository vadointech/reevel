"use client";

import Image from "next/image";
import { ComponentProps } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useLoginCarouselSet } from "./useSet";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace LoginCarouselSet {
  export type Settings = {
    speed?: number;
    delay?: number;
    translate?: number;
    width?: number;
  }

  export type Data = {
    src: string | StaticImport;
  }

  export type Props = ComponentProps<"div"> & {
    data: Data[];
    settings?: Settings;
  }
}

export const LoginCarouselSet = ({ data, settings, className, ...props }: LoginCarouselSet.Props) => {

    const delay = settings?.delay || 0;
    const speed = settings?.speed || 5000;
    const translate = settings?.translate || 0;
    const width = settings?.width || 100;

    const [sliderRef] = useLoginCarouselSet({ delay, speed });

    return (
        <div
            className={cx(
                styles.carousel,
                className
            )}
            style={{
                translate,
                width: `${width}%`,
            }}
            {...props}
        >
            <div
                ref={sliderRef}
                className={styles.carousel__root}
            >
                <div
                    className={styles.carousel__container}
                >
                    {
                        data.map((item, index) => (
                            <div
                                key={index}
                                className={styles.carousel__slide}
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