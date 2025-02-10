import { ComponentProps } from "react";
import Image from "next/image";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";

import styles from "./styles.module.scss";
import cx from "classnames";

namespace LoginCarouselCard {
    export type Props = ComponentProps<"div"> & {
        img: string | StaticImport;
    };
}

const LoginCarouselCard = ({ img, className, ...props }: LoginCarouselCard.Props) => {
    return (
        <div
            className={cx(
                styles.card,
                className,
            )}
            {...props}
        >
            <Image fill src={img} alt="Franchise logo" />
        </div>
    );
};

export { LoginCarouselCard };
