"use client";

import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Toggle {
    export type Props = ComponentProps<"button"> & {
        toggled: boolean;
        setToggled: () => void;
    };
}


export const Toggle = ({
    toggled,
    setToggled,
    className,
    ...props
}: Toggle.Props) => {
    return (
        <button
            onClick={() => setToggled()}
            className={cx(
                styles.toggle,
                toggled && styles.toggle_toggled,
                className,
            )}
            {...props}
        >
            <div className={cx(
                styles.toggle__thumb,
                toggled && styles.toggle__thumb_toggled,
            )}></div>
        </button>
    );
};