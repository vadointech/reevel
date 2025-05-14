import { ComponentProps } from "react";

import baseStyles from "../../base-styles.module.scss";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace InputTextArea {
    export type Props = ComponentProps<"textarea"> & {
        label?: string;
    };
}

export const InputTextArea = ({
    label,
    ...props
}: InputTextArea.Props) => {
    return (
        <label
            className={cx(
                baseStyles.input,
                styles.input,
            )}
        >
            {
                label ? (
                    <span className={baseStyles.input__label}>
                        { label }
                    </span>
                ) : null
            }
            <textarea {...props} />
        </label>
    );
};
