
import { ComponentProps } from "react";

import image_1 from "@/../public/assets/temp/carousel1.jpg";
import image_2 from "@/../public/assets/temp/carousel2.jpg";
import image_3 from "@/../public/assets/temp/carousel3.jpg";
import image_4 from "@/../public/assets/temp/carousel4.jpg";
import image_5 from "@/../public/assets/temp/carousel5.jpg";
import image_6 from "@/../public/assets/temp/carousel6.jpg";
import image_7 from "@/../public/assets/temp/carousel7.jpg";

import styles from "./styles.module.scss";
import cx from "classnames";
import { CardCarouselSet } from "./set";

export namespace LoginCarousel {
    export type Props = ComponentProps<"div"> & {};
}

const data: CardCarouselSet.Data[] = [
    { src: image_1 },
    { src: image_2 },
    { src: image_7 },
    { src: image_6 },
    { src: image_5 },
    { src: image_6 },
    { src: image_7 },
];
const data1: CardCarouselSet.Data[] = [
    { src: image_1 },
    { src: image_5 },
    { src: image_2 },
    { src: image_4 },
    { src: image_5 },
    { src: image_6 },
    { src: image_7 },
];
const data2: CardCarouselSet.Data[] = [
    { src: image_1 },
    { src: image_3 },
    { src: image_7 },
    { src: image_4 },
    { src: image_5 },
    { src: image_6 },
    { src: image_7 },
];

export const CardCarousel = ({ className }: LoginCarousel.Props) => {
    return (
        <div
            className={cx(styles.grid, className)}
        >
            <CardCarouselSet
                className={styles.first}
                data={data}

            />
            <CardCarouselSet
                className={styles.second}
                data={data1}

            />

            <CardCarouselSet
                className={styles.third}
                data={data2}
            />
        </div>
    );
};