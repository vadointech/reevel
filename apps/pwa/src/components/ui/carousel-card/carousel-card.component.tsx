import cx from "classnames";
import styles from "./styles.module.scss";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

namespace CarouselCard {
    export type Props = React.ComponentProps<"div"> & {
        img: string | StaticImport;
        empty?: boolean;
    };
}

const CarouselCard = ({ img, empty, className, ...props }: CarouselCard.Props) => {
    return (
        <div
            className={cx(
                styles.card,
                className,
            )}
            {...props}
        >
            {!empty && (
                <Image fill src={img} alt="Franchise logo" />
            )}
        </div>
    );
};

export { CarouselCard };
