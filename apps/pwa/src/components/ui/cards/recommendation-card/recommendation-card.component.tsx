import Image from "next/image";
import { ComponentProps } from "react";

import cx from "classnames";
import styles from "./styles.module.scss";
import { LocationBadge } from "@/components/ui/location";
import { hexToRgba } from "@/utils/hex-to-rgba";
import { EventEntity } from "@/entities/event";

export namespace RecommendationCard {
    export type Data = {
        event: EventEntity
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const RecommendationCard = ({
    event,
    className,
    ...props
}: RecommendationCard.Props) => (
    <div
        className={cx(styles.card, className)}
        style={{
            background: `${hexToRgba(event.primaryColor, 0.8)}`,
        }}
        {...props}
    >
        <div className={styles.card__content}>
            <div className={styles.card__image}>
                <Image
                    alt={event.title}
                    src={event.poster}
                    width={122}
                    height={122}
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>
            <div className={styles.card__info}>
                <LocationBadge
                    size={"small"}
                    className={styles.card__place}
                >
                    { event.location.type }
                </LocationBadge>
                <h2 className={styles.card__title}>
                    { event.title }
                </h2>
                <p className={styles.card__description}>
                    { event.description }
                </p>
            </div>
        </div>
    </div>
);