import { ComponentProps } from "react";
import cx from "classnames";
import styles from "./styles.module.scss";

export namespace InterestCard {
    export type Props = ComponentProps<"input"> & {
        icon: string
        text: string
    };
}



export const InterestCard = ({ icon, text, className, ...props }: InterestCard.Props) => {
    return (
        <label className={cx(
            styles.label,
            className
        )}>

            <div className={styles.label__wrapper}>
                <input type="checkbox" className={styles.label__input} />
                <p className={styles.icon}>{icon}</p>
            </div>

            <span className={styles.text}>{text}</span>
        </label>
    );
};
