import { ComponentProps } from "react";
import { InputNumber, InputSearch, InputTextArea } from "./variants";

import baseStyles from "./base-styles.module.scss";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Input {
    export type Props = ComponentProps<"input"> & {
        label?: string;
    };
}

export const Input = ({
    label,
    ...props
}: Input.Props) => {
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
            <input type={"text"} {...props} />
        </label>
    );
};

Input.Number = InputNumber;
Input.TextArea = InputTextArea;
Input.Search = InputSearch;