import { ComponentProps } from "react";
import { cx } from "class-variance-authority";

import styles from "../styles/bottons-block.module.scss";

export namespace ButtonsBlock {
    export type Props = ComponentProps<"div"> & {
        container?: boolean;
    };
}

export const ButtonsBlock = ({
    container = true,
    className,
    ...props
}: ButtonsBlock.Props) => {
    return (
        <div
            className={cx(
                styles.buttons,
                container && styles.buttons_container,
                className,
            )}
            {...props}
        />
    );
};
