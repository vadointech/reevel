import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

namespace Container {
    export type Props = ComponentProps<"div">;
}

const Container = ({
    children,
    className,
    ...props
}: Container.Props) => {
    return (
        <div
            className={cx(
                styles.container,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export { Container };