import { ComponentProps, ReactNode } from "react";
import { Back } from "@/components/icons";

import cx from "classnames";
import styles from "./styles.module.scss";

export namespace Header {

    export type Size = "default" | "large";
    export type Type = "textButton" | "button";

    export type Props = ComponentProps<"div"> & {
        controlLeft?: ReactNode;
        controlRight?: ReactNode | string;
        title: string;
        size?: Size;
        controlRightType: Type;
    };
}

export const Header = ({
    className,
    controlLeft = <Back width={11} height={20} strokeWidth={0.3} />,
    controlRight,
    controlRightType,
    title,
    size,
}: Header.Props) => {


    const ControlRightView: Record<Header.Type, ReactNode> = {
        textButton: (
            controlRight
        ),
        button: (
            <div className={styles.controls__close}>
                {controlRight}
            </div>
        ),
    };


    return (
        <div className={cx(
            styles.header,
            styles[`header__${size}`],
            className,
        )}>
            <div className={cx(
                styles.controls,
                styles[`controls_${size}`],
            )}>
                {controlLeft}
            </div>

            <div className={cx(
                styles.title,
                styles[`title_${size}`],
            )}>
                {title}
            </div>

            <div className={cx(
                styles.controls,
                styles[`controls__${controlRightType}`],
            )}>
                {controlRight ?? ControlRightView[controlRightType]}
            </div>
        </div>
    );
};
