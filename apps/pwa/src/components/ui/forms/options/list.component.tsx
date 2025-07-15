import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace OptionsList {
    export type Props = ComponentProps<"ul"> & {
        spacingMode?: "gap" | "padding";
    };
}

export const OptionsList = ({
    spacingMode = "gap",
    className,
    ...props
}: OptionsList.Props) => {
    return (
        <ul
            className={cx(
                styles.list,
                styles[`list_spacing_${spacingMode}`],
                className,
            )}
            {...props}
        />
    );
};
