import { ComponentProps } from "react";

import { IconCheck } from "@/components/icons";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Checkbox {
    export type Props = ComponentProps<"label"> & {
        checked?: boolean;
    };
}

export const Checkbox = ({
    className,
    checked,
    ...props
}: Checkbox.Props) => {
    return (
        <label
            className={cx(
                styles.checkbox,
                checked ? styles.checkbox_state_checked : styles.checkbox_state_default,
                className,
            )}
            {...props}
        >
            <input
                type={"checkbox"}
            />
            <IconCheck />
        </label>
    );
};
