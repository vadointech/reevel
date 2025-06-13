import cx from "classnames";
import styles from "../styles.module.scss";
import { ReactNode } from "react";

export namespace OptionsListItemLeft {
    export type Props = {
        contentLeft?: ReactNode;
        iconType: "filled" | "outlined";
    };
};

export const OptionsListItemLeft = ({
    contentLeft,
    iconType,
}: OptionsListItemLeft.Props) => {
    if (!contentLeft) return null;
    return (
        <div className={cx(
            styles.listItem__left,
            styles[`listItem__left_icon_${iconType}`],
        )}>
            {contentLeft}
        </div>
    );
};