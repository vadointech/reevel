
import { AuthCarouselSet } from "./components";

import image_1 from "@/../public/assets/temp/carousel1.jpg";
import image_2 from "@/../public/assets/temp/carousel2.jpg";
import image_3 from "@/../public/assets/temp/carousel3.jpg";
import image_4 from "@/../public/assets/temp/carousel4.jpg";
import image_5 from "@/../public/assets/temp/carousel5.jpg";
import image_6 from "@/../public/assets/temp/carousel6.jpg";
import image_7 from "@/../public/assets/temp/carousel7.jpg";

import styles from "./styles/carousel.module.scss";

export namespace AuthCarousel {
    export type Props = never;
}

const data: AuthCarouselSet.Data[] = [
    { src: image_1 },
    { src: image_2 },
    { src: image_3 },
    { src: image_4 },
    { src: image_5 },
    { src: image_6 },
    { src: image_7 },
];

export const AuthCarousel = () => {
    return (
        <div
            className={styles.grid}
        >
            <AuthCarouselSet
                className={styles.first}
                data={data}
                settings={{
                    width: 120,
                }}
            />
            <AuthCarouselSet
                className={styles.second}
                data={data}
                settings={{
                    delay: 500,
                    width: 155,
                    translate: -10,
                }}
            />

            <AuthCarouselSet
                className={styles.third}
                data={data}
                settings={{
                    delay: 300,
                    width: 120,
                    translate: -30,
                }}
            />
        </div>
    );
};