import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

namespace Container {
    export type Props = ComponentProps<"div"> & {
        center?: boolean;
        subLgCenter?: boolean;
    };
}

const Container = ({
    children,
    className,
    center = false,
    ...props
}: Container.Props) => {
    return (
        <div
            className={cx(
                styles.container,
                center && styles.container__center,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export { Container };