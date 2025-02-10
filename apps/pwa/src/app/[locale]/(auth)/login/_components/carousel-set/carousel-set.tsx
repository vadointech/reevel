import { ComponentProps } from "react";

import cx from "classnames";
import styles from "./styles.module.scss";


namespace CarouselSet {
  export type Props = ComponentProps<"div"> & {
  };
}

const CarouselSet = ({
    className,
    children,
    ...props
}: CarouselSet.Props) => {
    return (
        <div
            className={cx(
                styles.items,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export { CarouselSet };