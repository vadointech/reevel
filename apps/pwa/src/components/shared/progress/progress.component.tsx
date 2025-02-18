import { ComponentProps, ReactNode } from "react";
import { ArrowBack, IconClose } from "@/components/icons";

import cx from "classnames";
import styles from "./styles.module.scss";

export namespace ProgressBar {

    export type Type = "back" | "close";

    export type Props = ComponentProps<"div"> & {
        stepCount: number;
        currentStep: number;
        controlLeft?: ReactNode;
        controlRight?: ReactNode;
        type?: Type;
    };
}

export const ProgressBar = ({
    className,
    stepCount = 4,
    currentStep = 0,
    controlLeft,
    controlRight = "Skip",
    type = "back",
}: ProgressBar.Props) => {

    const ControlLeftView: Record<ProgressBar.Type, ReactNode> = {
        back: <ArrowBack width={20} height={16} style={{ rotate: "180deg" }} strokeWidth={0.3} />,
        close: <IconClose width={16} height={16} strokeWidth={2} />,
    };

    return (
        <div
            className={cx(
                styles.progress,
                className,
            )}
        >
            <div
                className={cx(
                    styles.controls,
                )}
            >
                {
                    controlLeft ? controlLeft : ControlLeftView[type]
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
            {
                !text ?
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
                    : <p className={styles.text}>{text}</p>
            }
            <div className={styles.controls}>
                {controlRight}
            </div>
        </div>
    );
};