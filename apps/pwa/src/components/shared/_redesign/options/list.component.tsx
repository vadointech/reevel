import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace OptionsList {
    export type Props = ComponentProps<"ul">;
}

export const OptionsList = ({
    className,
    ...props
}: OptionsList.Props) => {
    return (
        <ul
            className={cx(
                styles.list,
                className,
            )}
            {...props}
        />
    );
};
