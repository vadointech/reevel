import cx from "classnames";
import styles from "./styles.module.scss";
import { CarouselSet } from "../carousel-set";
import { CarouselCard } from "@/components/ui/carousel-card";
import image_1 from "@/../public/assets/temp/carousel1.jpg";
import image_2 from "@/../public/assets/temp/carousel2.jpg";
import image_3 from "@/../public/assets/temp/carousel3.jpg";
import image_4 from "@/../public/assets/temp/carousel4.jpg";
import image_5 from "@/../public/assets/temp/carousel5.jpg";
import image_6 from "@/../public/assets/temp/carousel6.jpg";
import image_7 from "@/../public/assets/temp/carousel7.jpg";






namespace CarouselLayout {
    export type Props = React.ComponentProps<"div"> & {
    };
}

const CarouselLayout = ({
    className,
    children,
    ...props
}: CarouselLayout.Props) => {
    return (
        <div
            className={cx(
                styles.grid,
                className,
            )}
            {...props}
        >
            <CarouselSet className={styles.first}>
                <CarouselCard img={image_1} />
                <CarouselCard img={image_2} />
                <CarouselCard img={image_3} />
            </CarouselSet>
            <CarouselSet className={styles.second}>
                <CarouselCard img={image_4} />
                <CarouselCard img={image_5} />
                <CarouselCard img={image_6} />
                <CarouselCard img={image_7} />
            </CarouselSet>
            <CarouselSet className={styles.third}>
                <CarouselCard img={image_4} />
                <CarouselCard img={image_1} />
                <CarouselCard img={image_5} />
            </CarouselSet>    </div>
    );
};

export { CarouselLayout };