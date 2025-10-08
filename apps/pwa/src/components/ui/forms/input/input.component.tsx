import { ComponentProps } from "react";
import { InputNumber, InputSearch, InputTextArea, InputFile } from "./variants";

import baseStyles from "./base-styles.module.scss";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Input {
    export type Props = ComponentProps<"input"> & {
        label?: string;
        hint?: string;
    };
}

export const Input = ({
    label,
    hint,
    ...props
}: Input.Props) => {
    return (
        <div>
            <label
                className={cx(
                    baseStyles.input,
                    styles.input,
                    label !== undefined && styles.input_label,
                )}
            >
                {
                    label ? (
                        <span className={baseStyles.input__label}>
                            { label }
                        </span>
                    ) : null
                }
                <input
                    type={"text"}
                    {...props}
                />
            </label>
            {
                hint ? (
                    <p className={baseStyles.input__hint}>
                        { hint }
                    </p>
                ) : null
            }
        </div>
    );
};

Input.Number = InputNumber;
Input.TextArea = InputTextArea;
Input.Search = InputSearch;
Input.File = InputFile;