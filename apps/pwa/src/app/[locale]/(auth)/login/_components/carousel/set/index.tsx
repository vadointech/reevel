import { ComponentProps } from "react";

import cx from "classnames";
import styles from "./styles.module.scss";


namespace LoginCarouselSet {
  export type Props = ComponentProps<"div">
}

const LoginCarouselSet = ({
    className,
    children,
    ...props
}: LoginCarouselSet.Props) => {
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

export { LoginCarouselSet };