import { ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace InputFile {
    export type Props = ComponentProps<"input"> & {
        label: string | ReactNode;
        icon?: ReactNode | null;
        variant?: "secondary-muted" | "accent-muted"
    };
}

export const InputFile = ({
    label,
    className,
    icon,
    variant = "secondary-muted",
    ...props
}: InputFile.Props) => {
    return (
        <label
            className={cx(
                styles.input,
                styles[`input_variant_${variant}`],
                className,
            )}
        >
            <input
                type={"file"}
                {...props}
            >
            </input>
            { icon }
            { label }
        </label>
    );
};
