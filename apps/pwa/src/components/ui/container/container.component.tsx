import cx from "classnames";
import styles from "./styles.module.scss";

namespace Container {
    export type Props = React.ComponentProps<"div"> & {
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
                className,
                center && styles.container__center,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export { Container };