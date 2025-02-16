import { ComponentProps, ReactNode } from "react";
import { ArrowBack, IconClose } from "@/components/icons";

import cx from "classnames";
import styles from "./styles.module.scss";

export namespace ProgressBar {
    export type Props = ComponentProps<"div"> & {
        stepCount: number;
        currentStep: number;
        controlLeft?: ReactNode
        controlRight?: ReactNode,
        invertedLeftControl?: boolean
        type?: 'back' | 'close'
    };
}

export const ProgressBar = ({
    className,
    stepCount = 4,
    currentStep = 0,
    controlLeft,
    controlRight = "Skip",
    invertedLeftControl = false,
    type = 'back'
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
                {controlLeft ?
                    controlLeft
                    : type == 'back' ? <ArrowBack strokeWidth={0.3} />
                        : <IconClose strokeWidth={2} />
                }
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