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
        title?: string;
        size?: Size;
        controlRightType?: Type;
        onControlLeftClick?: () => void;
        onControlRightClick?: () => void;
        children?: ReactNode;
    };
}

export const Header = ({
    className,
    controlLeft = <Back width={10} height={18} strokeWidth={0.1} />,
    controlRight,
    controlRightType = "textButton",
    title,
    size,
    onControlLeftClick,
    onControlRightClick,
    children,
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
        <div
            className={cx(
                styles.header,
                styles[`header__${size}`],
                className,
            )}
        >
            <div
                className={cx(
                    styles.controls,
                    styles[`controls_${size}`],
                )}
                onClick={onControlLeftClick}
            >
                {controlLeft}
            </div>

            <div
                className={cx(
                    styles.title,
                    styles[`title_${size}`],
                )}
            >
                {title}
                {children}
            </div>

            {
                controlRight
                    ? <div
                        className={cx(
                            styles.controls,
                            styles[`controls__${controlRightType}`],
                        )}
                        onClick={onControlRightClick}
                    >
                        {ControlRightView[controlRightType]}
                    </div>

                    : <div />
            }
        </div>
    );
};
