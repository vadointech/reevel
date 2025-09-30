import { ComponentProps } from "react";
import Image from "next/image";
import { useCreateEventFormFieldFormatter } from "@/features/event/create";
import { IconCalendar } from "@/components/icons";
import { AttendeesBadge } from "@/components/ui";

import { EventEntity } from "@/entities/event";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace PreviewCard {
    export type Data = {
        event: EventEntity
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const PreviewCard = ({
    event,
    className,
    ...props
}: PreviewCard.Props) => {

    const formatter = useCreateEventFormFieldFormatter();

    return (
        <div
            className={cx(styles.card, className)}
            {...props}
        >
            <div className={styles.card__content}>
                <div className={styles.card__image}>
                    <Image
                        alt={event.title}
                        src={event.poster}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
                <div className={styles.card__info}>
                    <div className={styles.card__info__date}>
                        <IconCalendar />
                        { formatter.formatDate(event.startDate) }
                    </div>
                    <div className={styles.card__info__title}>
                        { event.title }
                    </div>

                    <AttendeesBadge size={"small"} users={event.tickets.map(item => item.user.profile)} />
                </div>
            </div>
        </div>
    );
};