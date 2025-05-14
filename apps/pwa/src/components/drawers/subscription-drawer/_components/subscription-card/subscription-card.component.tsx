import { ComponentProps } from "react";

import styles from "./styles.module.scss"
import cx from "classnames"
import { IconLightning } from "@/components/icons";
import { LoginCarousel, LoginCarouselPagination } from "@/app/[locale]/(auth)/login/_components";
import { CardCarouselSet } from "../carousel/set";
import { CardCarousel } from "../carousel/card-carousel";

export namespace SubscriptionCard {
    export type Props = ComponentProps<"div"> & {
        title: string;
        type?: string;
        price: string
        description: string;
    }
}

export const SubscriptionCard = ({
    title,
    type,
    price,
    description,
    className
}: SubscriptionCard.Props) => {
    return (
        <div className={cx(styles.card, className)}>
            <div className={styles.card__info}>
                <span>{title}</span>
                {type &&
                    <div>
                        <IconLightning />
                        <p>{type}</p>
                    </div>
                }
            </div>
            <div className={styles.card__meta}>
                <span>{price} $/month</span>
                <p>{description}</p>
            </div>
            <CardCarousel className={styles.card__carousel} />
        </div>
    )
}