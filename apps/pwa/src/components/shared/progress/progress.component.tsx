import { ComponentProps, ReactNode } from "react";
import { ArrowBack, Back, IconClose } from "@/components/icons";

import cx from "classnames";
import styles from "./styles.module.scss";

export namespace ProgressBar {
    export type Type = "back" | "close" | 'shortBack';
    export type Mode = "default" | "text";

    export type Props = ComponentProps<"div"> & {
        stepCount: number;
        currentStep: number;
        controlLeft?: ReactNode;
        controlRight?: ReactNode;
        type?: Type;
        mode?: Mode;
        text?: string;
    };
}

export const ProgressBar = ({
    className,
    stepCount = 4,
    currentStep = 0,
    controlLeft,
    controlRight = "Skip",
    type = "back",
    mode = "default",
    text,
}: ProgressBar.Props) => {

    const ControlLeftView: Record<ProgressBar.Type, ReactNode> = {
        back: <ArrowBack width={20} height={16} style={{ rotate: "180deg" }} strokeWidth={0.3} />,
        close: <IconClose width={16} height={16} strokeWidth={2} />,
        shortBack: <Back width={10} height={19} strokeWidth={0.3} />,
    };

    const ModeView: Record<ProgressBar.Mode, ReactNode> = {
        default: (
            <div className={styles.indicator}>
                {new Array(stepCount).fill(null).map((_, i) => (
                    <div
                        key={i}
                        className={cx(
                            styles.indicator__item,
                            i === currentStep && styles.indicator__item_active
                        )}
                    />
                ))}
            </div>
        ),

        text: <div className={styles.text}>{text}</div>,
    };

    return (
        <div className={cx(styles.progress, className)}>
            <div className={cx(
                styles.controls,
                mode == 'text' && styles.controls__white
            )}>

                {controlLeft ?? ControlLeftView[type]}

            </div>

            {ModeView[mode]}

            <div className={styles.controls}>
                {mode === "default" && controlRight}
            </div>
        </div>
    );
};
