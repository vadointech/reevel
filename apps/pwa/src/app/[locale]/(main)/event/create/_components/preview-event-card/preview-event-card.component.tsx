import { ComponentProps } from "react";
import Image from "next/image";
import { IconCalendar, IconLock } from "@/components/icons";
import {
    CreateEventFormSchemaValues,
    useCreateEventFormFieldFormatter,
} from "@/features/event/create";
import { hexToRgba } from "@/utils/hex-to-rgba";
import { Avatar, Badge } from "@/components/shared/_redesign";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace PreviewEventCard {
    export type Data = {
        event: CreateEventFormSchemaValues
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const PreviewEventCard = ({
    className,
    event,
    ...props
}: PreviewEventCard.Props) => {
    const formatter = useCreateEventFormFieldFormatter();
    return (
        <div
            className={cx(
                styles.card,
                className,
            )}
            {...props}
        >
            <Image
                fill
                src={"/assets/temp/poster6.png"}
                alt={"Poster"}
            />

            <div
                className={styles.card__header}
                style={{
                    background: `linear-gradient(
                        to bottom,
                        ${hexToRgba("#172B0", 0.6)} 52%,
                        ${hexToRgba("#172B0", 0.5)} 66%,
                        ${hexToRgba("#172B0", 0.3)} 80%,
                        ${hexToRgba("#172B0", 0.1)} 92%,
                        ${hexToRgba("#172B0", 0)} 100%
                    )`,
                }}
            >
                <div className={styles.card__host}>
                    <Avatar className={styles.card__host_avatar} image={"/assets/temp/avatar.png"} variant={"outline"} />
                    <div className={styles.card__host_name}>
                        <h3>
                            Hosted by
                        </h3>
                        <span>
                            { event.host }
                        </span>
                    </div>
                </div>

                <Badge
                    variant={"ghost"}
                    size={"small"}
                    iconBefore={<IconLock />}
                >
                    Private
                </Badge>
            </div>

            <div
                className={styles.card__content}
                style={{
                    background: `linear-gradient(
                        to top,
                        ${hexToRgba("#172B0", 1)} 64%,
                        ${hexToRgba("#172B0", 0.8)} 72%,
                        ${hexToRgba("#172B0", 0.6)} 78%,
                        ${hexToRgba("#172B0", 0.4)} 84%,
                        ${hexToRgba("#172B0", 0.2)} 90%,
                        ${hexToRgba("#172B0", 0.05)} 96%,
                        ${hexToRgba("#172B0", 0)} 100%
                    )`,
                }}
            >
                <h3 className={styles.card__title}>
                    { event.title }
                </h3>

                <div className={styles.card__date}>
                    <IconCalendar />
                    { formatter.formatDate(event.startDate) } • { formatter.formatTime(event.startTime) }
                </div>

                <div className={styles.card__price}>
                    { event.ticketPrice || "Free" } ₴
                    {
                        (event.ticketsCount && event.ticketsCount.length > 0) && (
                            <div className={styles.card__tickets}>
                                { event.ticketsCount } tickets
                            </div>
                        )
                    }
                </div>

                <div className={styles.card__interests}>
                    {
                        event.interests.map(item => (
                            <div key={item.slug} className={styles.card__interest}>
                                <span>{ item.icon }</span> { item.title_en }
                            </div>
                        ))
                    }
                </div>

                <p className={styles.card__description}>
                    { event.description }
                </p>
            </div>
        </div>
    );
};
