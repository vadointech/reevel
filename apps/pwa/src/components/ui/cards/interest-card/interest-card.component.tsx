import { ComponentProps, memo } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace InterestCard {
    export type Props = ComponentProps<"input"> & {
        icon: string;
        text: string;
        selected: boolean;
    };
}

export const InterestCard = memo(({
    icon,
    text,
    selected,
    className,
    ...props
}: InterestCard.Props) => {
    return (
        <label
            className={cx(
                styles.label,
                className,
            )}
        >
            <div className={styles.label__wrapper}>
                <input
                    type={"checkbox"}
                    checked={selected}
                    {...props}
                />
                <span className={styles.icon}>{icon}</span>
            </div>

            <span className={styles.text}>{text}</span>
        </label>
    );
});
