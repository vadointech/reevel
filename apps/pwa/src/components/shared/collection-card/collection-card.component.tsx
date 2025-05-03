import { ComponentProps } from "react";
import cx from "classnames";
import styles from "./styles.module.scss";
import { ArrowBack } from "@/components/icons";

export namespace CollectionCard {
    export type Props = ComponentProps<"div"> & {
        title: string,
        city: string,
        emoji: string,
        backgroundText: string,
        colorFrom: string,
        colorTo: string
    };
}



export const CollectionCard = ({
    title,
    city,
    emoji,
    backgroundText,
    colorFrom,
    colorTo,
    className,
    ...props
}: CollectionCard.Props) => {
    return (
        <div
            className={cx(styles.card, className)}
            style={{
                background: `linear-gradient(94deg, ${colorFrom} 50%, ${colorTo} 100%)`,
            }}
            {...props}
        >
            <div className={styles.card__info}>
                <h2 className={styles.card__info__title}>{title}</h2>
                <p className={styles.card__info__city}>in {city}</p>
            </div>

            <div className={styles.card__foreground}>
                {emoji}
            </div>

            <div className={styles.card__detailed}>
                <div className={styles.card__detailed__icon}>
                    <ArrowBack width={7} height={6} strokeWidth={0.3} />
                </div>
                <p>SHOW ME</p>
            </div>

            <div className={styles.card__background}>
                {backgroundText}
            </div>
        </div>
    );
};
