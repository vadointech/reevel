import { ComponentProps } from "react";
import Image from "next/image";
import { IconCalendar, IconGlobe, IconLock } from "@/components/icons";
import {
    CreateEventFormSchemaValues,
    useCreateEventFormFieldFormatter,
} from "@/features/event/create";
import { hexToRgba } from "@/utils/hex-to-rgba";
import { Avatar, Badge } from "@/components/shared/_redesign";
import { UserProfileEntity } from "@/entities/profile";
import { EventVisibility } from "@/entities/event";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace PreviewEventCard {
    export type Data = {
        event: CreateEventFormSchemaValues;
        host?: UserProfileEntity
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const PreviewEventCard = ({
    event,
    host,
    className,
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
            {
                event.poster ? (
                    <Image
                        fill
                        src={event.poster.fileUrl}
                        alt={"Poster"}
                    />
                ) : (
                    <Image
                        fill
                        src={"/assets/temp/poster6.png"}
                        alt={"Poster"}
                    />
                )
            }
            <div
                className={styles.card__header}
                style={{
                    background: `linear-gradient(
                        to bottom,
                        ${hexToRgba(event.primaryColor || "#172B0", 0.6)} 52%,
                        ${hexToRgba(event.primaryColor || "#172B0", 0.5)} 66%,
                        ${hexToRgba(event.primaryColor || "#172B0", 0.3)} 80%,
                        ${hexToRgba(event.primaryColor || "#172B0", 0.1)} 92%,
                        ${hexToRgba(event.primaryColor || "#172B0", 0)} 100%
                    )`,
                }}
            >
                <div className={styles.card__host}>
                    <Avatar className={styles.card__host_avatar} image={host?.picture} variant={"outline"} />
                    <div className={styles.card__host_name}>
                        <h3>
                            Hosted by
                        </h3>
                        <span>
                            { host?.fullName }
                        </span>
                    </div>
                </div>

                {
                    event.visibility === EventVisibility.PRIVATE ? (
                        <Badge
                            variant={"ghost"}
                            size={"small"}
                            iconBefore={<IconLock />}
                        >
                            Private
                        </Badge>
                    ) : (
                        <Badge
                            variant={"ghost"}
                            size={"small"}
                            iconBefore={<IconGlobe />}
                        >
                            Public
                        </Badge>
                    )
                }
            </div>

            <div
                className={styles.card__content}
                style={{
                    background: `linear-gradient(
                        to top,
                        ${hexToRgba(event.primaryColor || "#172B0", 1)} 64%,
                        ${hexToRgba(event.primaryColor || "#172B0", 0.8)} 72%,
                        ${hexToRgba(event.primaryColor || "#172B0", 0.6)} 78%,
                        ${hexToRgba(event.primaryColor || "#172B0", 0.4)} 84%,
                        ${hexToRgba(event.primaryColor || "#172B0", 0.2)} 90%,
                        ${hexToRgba(event.primaryColor || "#172B0", 0.05)} 96%,
                        ${hexToRgba(event.primaryColor || "#172B0", 0)} 100%
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
                    {
                        event.ticketPrice ? (
                            event.ticketPrice + " ₴"
                        ) : null
                    }
                    {
                        (event.ticketsAvailable && event.ticketsAvailable.length > 0) && (
                            <div className={styles.card__tickets}>
                                { event.ticketsAvailable } tickets
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
