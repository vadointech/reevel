import { ComponentProps } from "react";
import { LoginCarouselSet } from "./set";
import { LoginCarouselCard } from "./card";

import image_1 from "@/../public/assets/temp/carousel1.jpg";
import image_2 from "@/../public/assets/temp/carousel2.jpg";
import image_3 from "@/../public/assets/temp/carousel3.jpg";
import image_4 from "@/../public/assets/temp/carousel4.jpg";
import image_5 from "@/../public/assets/temp/carousel5.jpg";
import image_6 from "@/../public/assets/temp/carousel6.jpg";
import image_7 from "@/../public/assets/temp/carousel7.jpg";

import cx from "classnames";
import styles from "./styles.module.scss";

export namespace LoginCarousel {
    export type Props = ComponentProps<"div">
}

export const LoginCarousel = ({
    className,
    ...props
}: LoginCarousel.Props) => {
    return (
        <div
            className={cx(
                styles.grid,
                className,
            )}
            {...props}
        >
            <LoginCarouselSet className={styles.first}>
                <LoginCarouselCard img={image_1} />
                <LoginCarouselCard img={image_2} />
                <LoginCarouselCard img={image_3} />
            </LoginCarouselSet>
            <LoginCarouselSet className={styles.second}>
                <LoginCarouselCard img={image_4} />
                <LoginCarouselCard img={image_5} />
                <LoginCarouselCard img={image_6} />
                <LoginCarouselCard img={image_7} />
            </LoginCarouselSet>
            <LoginCarouselSet className={styles.third}>
                <LoginCarouselCard img={image_4} />
                <LoginCarouselCard img={image_1} />
                <LoginCarouselCard img={image_5} />
            </LoginCarouselSet>
        </div>
    );
};