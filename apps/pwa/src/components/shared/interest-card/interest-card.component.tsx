import { ComponentProps, memo } from "react";
import cx from "classnames";
import styles from "./styles.module.scss";

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
                    type="checkbox"
                    className={styles.label__input}
                    checked={selected}
                    {...props}
                />
                <p className={styles.icon}>{icon}</p>
            </div>

            <span className={styles.text}>{text}</span>
        </label>
    );
});
