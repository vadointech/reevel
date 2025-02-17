import { ComponentProps } from "react";
import cx from "classnames";
import styles from "./styles.module.scss";

export namespace InterestCard {
    export type Props = Omit<ComponentProps<"input">, "onChange"> & {
        icon: string;
        text: string;
        selected: boolean;
        onChange: (selected: boolean) => void; // Додаємо onChange
    };
}



export const InterestCard = ({ icon, text, selected, onChange, className, ...props }: InterestCard.Props) => {
    return (
        <label className={cx(
            styles.label,
            className
        )}>

            <div className={styles.label__wrapper}>
                <input
                    type="checkbox"
                    className={styles.label__input}
                    checked={selected}
                    onChange={() => onChange(!selected)}
                    {...props}
                />
                <p className={styles.icon}>{icon}</p>
            </div>

            <span className={styles.text}>{text}</span>
        </label>
    );
};
