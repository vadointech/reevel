import { ComponentProps } from "react";

import { IconLightning } from "@/components/icons";
import { CardCarousel } from "./_components/carousel/card-carousel";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace SubscriptionCard {
    export type Props = ComponentProps<"div"> & {
        title: string;
        type?: string;
        price: string
        description: string;
    };
}

export const SubscriptionCard = ({
    title,
    type,
    price,
    description,
    className,
}: SubscriptionCard.Props) => {
    return (
        <div className={cx(styles.card, className)}>
            <div className={styles.card__info}>
                <span className={styles.card__title}>
                    { title }
                </span>
                {
                    type && (
                        <div className={styles.card__badge}>
                            <IconLightning />
                            <p>{ type }</p>
                        </div>
                    )
                }
            </div>
            <div className={styles.card__meta}>
                <span>{price} $/month</span>
                <p>{description}</p>
            </div>
            <CardCarousel className={styles.card__carousel} />
        </div>
    );
};