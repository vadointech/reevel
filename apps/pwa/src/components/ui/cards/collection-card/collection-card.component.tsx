import { ComponentProps } from "react";
import { IconArrowNext } from "@/components/icons";

import styles from "./styles.module.scss";
import cx from "classnames";
import { InterestEntity } from "@/entities/interests";

export namespace CollectionCard {
    export type Data = {
        interest: InterestEntity;
        location: string;
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const CollectionCard = ({
    interest,
    location,
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
                background: `linear-gradient(94deg, ${interest.primaryColor} 50%, ${interest.secondaryColor} 100%)`,
            }}
            {...props}
        >
            <div className={styles.card__info}>
                <h2 className={styles.card__info__title}>
                    { interest.title_uk }
                </h2>
                <span className={styles.card__info__city}>
                    in { location }
                </span>
            </div>

            <div className={styles.card__foreground}>
                { interest.icon }
            </div>

            <div className={styles.card__detailed}>
                <div className={styles.card__detailed__icon}>
                    <IconArrowNext />
                </div>
                <span>
                    SHOW ME
                </span>
            </div>

            <div className={styles.card__background}>
                { interest.title_uk }
            </div>
        </div>
    );
};
