import { ComponentProps, ReactNode } from "react";
import { IconClose } from "@/components/icons";

import cx from "classnames";
import styles from "./styles.module.scss";

export namespace ProgressBar {
    export type Props = ComponentProps<"div"> & {
        stepCount: number;
        currentStep: number;
        controlLeft?: ReactNode
        controlRight?: ReactNode,
        invertedLeftControl?: boolean
    };
}

export const ProgressBar = ({
    className,
    stepCount = 4,
    currentStep = 0,
    controlLeft = <IconClose strokeWidth={2} />,
    controlRight = "Skip",
    invertedLeftControl = false,
}: ProgressBar.Props) => {
    return (
        <div
            className={cx(
                styles.progress,
                className,
            )}
        >
            <div className={cx(
                styles.controls,
                invertedLeftControl && styles.controls__inverted,
            )}>
                {controlLeft}
            </div>
            <div className={styles.indicator}>
                {
                    new Array(stepCount).fill(null).map((_, i) => (
                        <div
                            key={i}
                            className={cx(
                                styles.indicator__item,
                                i === currentStep && styles.indicator__item_active,
                            )}
                        />
                    ))
                }
            </div>
            <div className={styles.controls}>
                {controlRight}
            </div>
        </div>
    );
};