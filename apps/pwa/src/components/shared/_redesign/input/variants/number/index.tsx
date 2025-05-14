import { ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";

export namespace InputNumber {
    export type Props = ComponentProps<"input"> & {
        label: string | ReactNode;
    };
}

export const InputNumber = ({
    label,
    ...props
}: InputNumber.Props) => {
    return (
        <label className={styles.input}>
            <input
                type={"tel"}
                inputMode={"numeric"}
                pattern={"[0-9]*"}
                {...props}
            />
            <span>{ label }</span>
        </label>
    );
};
