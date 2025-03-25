"use client";

import { ComponentProps, ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Back } from "@/components/icons";

export namespace Toggle {
    export type Props = ComponentProps<"div"> & {
        date: string
        time: string
    };
}

export const Toggle = ({
    time,
    date,
    className,
    ...props
}: Toggle.Props) => {


    const [selected, setSelected] = useState<boolean>(true);

    return (
        <div
            className={cx(styles.toggle, className, {
                [styles.toggle__selected]: selected
            })}
            onClick={() => setSelected(!selected)}
            {...props}
        >
            <div className={cx(styles.toggle__element, {
                [styles.toggle__element_selected]: selected
            })}>
                {date}
                <span>{time}</span>
            </div>

            <Back strokeWidth={2} height={20} width={10} />

            <div className={cx(styles.toggle__element, {
                [styles.toggle__element_selected]: !selected
            })}>
                Optional
                <span>End Date</span>
            </div>
        </div>
    );
};