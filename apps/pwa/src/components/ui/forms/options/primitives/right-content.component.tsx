import { ReactNode } from "react";
import styles from "../styles.module.scss";

export namespace OptionsListItemRight {
    export type Props = {
        contentRight?: ReactNode
    };
}

export const OptionsListItemRight = ({ contentRight }: OptionsListItemRight.Props) => {
    if (!contentRight) return null;
    return (
        <div className={styles.listItem__right}>
            {contentRight}
        </div>
    );
};