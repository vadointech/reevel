import Image from "next/image";
import { ComponentProps } from "react";

import cx from "classnames";
import styles from "./styles.module.scss";
import { LocationBadge } from "@/components/ui/location";
import { hexToRgba } from "@/utils/hex-to-rgba";

export namespace RecommendationCard {
    export type Props = ComponentProps<"div"> & {
        title: string;
        image: string;
        location: string;
        description: string;
        primaryColor?: string;
    };
}

const DEFAULT_PRIMARY_COLOR = "#0A192F";

export const RecommendationCard = ({
    title,
    location,
    image,
    description,
    primaryColor = DEFAULT_PRIMARY_COLOR,
    className,
    ...props
}: RecommendationCard.Props) => (
    <div
        className={cx(styles.card, className)}
        style={{
            background: `linear-gradient(
                115deg,
                ${hexToRgba(primaryColor, 0.9)} 60%,
                ${hexToRgba(primaryColor, 0.7)} 70%,
                ${hexToRgba(primaryColor, 0.4)} 80%,
                ${hexToRgba(primaryColor, 0.2)} 88%,
                ${hexToRgba(primaryColor, 0.05)} 95%,
                ${hexToRgba(primaryColor, 0)} 100%
            )`,
        }}
        {...props}
    >
        <div className={styles.card__content}>
            <div className={styles.card__image}>
                <Image
                    alt={title}
                    src={image}
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
                    { location }
                </LocationBadge>
                <h2 className={styles.card__title}>{title}</h2>
                <p className={styles.card__description}>{description}</p>
            </div>
        </div>
    </div>
);