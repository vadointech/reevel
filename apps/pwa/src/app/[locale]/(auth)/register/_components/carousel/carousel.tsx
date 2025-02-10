import cx from "classnames";
import styles from "./styles.module.scss";
import { CarouselSet } from "../carousel-set";
import { CarouselCard } from "@/components/ui/carousel-card";
import movie_img from "@/../public/assets/temp/test.jpg";



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
                <CarouselCard img={movie_img} />
                <CarouselCard img={movie_img} />
                <CarouselCard img={movie_img} />
            </CarouselSet>
            <CarouselSet className={styles.second}>
                <CarouselCard img={movie_img} />
                <CarouselCard img={movie_img} />
                <CarouselCard img={movie_img} />
                <CarouselCard img={movie_img} />
            </CarouselSet>
            <CarouselSet className={styles.third}>
                <CarouselCard img={movie_img} />
                <CarouselCard img={movie_img} />
                <CarouselCard img={movie_img} />
            </CarouselSet>    </div>
    );
};

export { CarouselLayout };