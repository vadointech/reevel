import { ComponentProps } from "react";
import Image from "next/image";
import { AttendeesBadge, DateBadge } from "@/components/ui";

import { EventEntity } from "@/entities/event";

import styles from "./styles.module.scss";
import cx from "classnames";


export namespace EventListItemCard {
    export type Props = ComponentProps<"div"> & {
        event: EventEntity;
    };
}

export const EventListItemCard = ({
    event,
    className,
    ...props
}: EventListItemCard.Props) => {
    return (
        <div
            className={cx(
                styles.card,
                className,
            )}
            {...props}
        >
            <div className={styles.card__image}>
                <Image
                    fill
                    src={event.poster}
                    alt={"poster"}
                />
            </div>
            <div className={styles.card__content}>
                <DateBadge
                    size={"small"}
                    className={styles.card__date}
                >
                    Tuesday, Aug 4 • 14:00
                </DateBadge>
                <h3 className={styles.card__title}>
                    { event.title }
                </h3>
                <AttendeesBadge
                    size={"small"}
                    users={event.tickets.map(item => item.user.profile)}
                />
            </div>
        </div>
    );
};
