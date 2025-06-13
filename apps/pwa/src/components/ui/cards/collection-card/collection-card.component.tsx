import { ComponentProps } from "react";
import { ArrowBack } from "@/components/icons";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace CollectionCard {
    export type Data = {
        title: string,
        location: string,
        emoji: string,
        primaryColor: string,
        secondaryColor: string
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const CollectionCard = ({
    title,
    location,
    emoji,
    primaryColor,
    secondaryColor,
    className,
    ...props
}: CollectionCard.Props) => {
    return (
        <div
            className={cx(
                styles.card,
                className,
            )}
            style={{
                background: `linear-gradient(94deg, ${primaryColor} 50%, ${secondaryColor} 100%)`,
            }}
            {...props}
        >
            <div className={styles.card__info}>
                <h2 className={styles.card__info__title}>
                    { title }
                </h2>
                <span className={styles.card__info__city}>
                    in { location }
                </span>
            </div>

            <div className={styles.card__foreground}>
                { emoji }
            </div>

            <div className={styles.card__detailed}>
                <div className={styles.card__detailed__icon}>
                    <ArrowBack width={7} height={6} strokeWidth={0.3} />
                </div>
                <span>
                    SHOW ME
                </span>
            </div>

            <div className={styles.card__background}>
                { title }
            </div>
        </div>
    );
};
