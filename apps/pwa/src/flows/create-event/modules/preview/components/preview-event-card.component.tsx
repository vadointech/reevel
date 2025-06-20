import { ComponentProps } from "react";
import Image from "next/image";

import {
    CreateEventFormSchemaValues,
    useCreateEventFormFieldFormatter,
} from "@/features/event/create";
import { hexToRgba } from "@/utils/hex-to-rgba";

import { Avatar, Badge } from "@/components/ui";
import { IconCalendar, IconGlobe, IconLock } from "@/components/icons";

import { EventVisibility } from "@/entities/event";
import { UserProfileEntity } from "@/entities/profile";

import styles from "../styles/preview-event-card.module.scss";
import cx from "classnames";

export namespace CreateEventPreviewCard {
    export type Data = {
        posterUrl?: string | undefined;
        posterPrimaryColor?: string | undefined;
        eventData: CreateEventFormSchemaValues;
        host?: UserProfileEntity;
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const CreateEventPreviewCard = ({
    posterUrl = "/assets/temp/poster6.png",
    posterPrimaryColor = "#172B0",
    eventData,
    host,
    className,
    ...props
}: CreateEventPreviewCard.Props) => {
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
                src={posterUrl}
                alt={"Poster"}
            />
            <div
                className={styles.card__header}
                style={{
                    background: `linear-gradient(
                        to bottom,
                        ${hexToRgba(posterPrimaryColor, 0.6)} 52%,
                        ${hexToRgba(posterPrimaryColor, 0.5)} 66%,
                        ${hexToRgba(posterPrimaryColor, 0.3)} 80%,
                        ${hexToRgba(posterPrimaryColor, 0.1)} 92%,
                        ${hexToRgba(posterPrimaryColor, 0)} 100%
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
                    eventData.visibility === EventVisibility.PRIVATE ? (
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
                        ${hexToRgba(posterPrimaryColor, 1)} 64%,
                        ${hexToRgba(posterPrimaryColor, 0.8)} 72%,
                        ${hexToRgba(posterPrimaryColor, 0.6)} 78%,
                        ${hexToRgba(posterPrimaryColor, 0.4)} 84%,
                        ${hexToRgba(posterPrimaryColor, 0.2)} 90%,
                        ${hexToRgba(posterPrimaryColor, 0.05)} 96%,
                        ${hexToRgba(posterPrimaryColor, 0)} 100%
                    )`,
                }}
            >
                <h3 className={styles.card__title}>
                    { eventData.title }
                </h3>

                <div className={styles.card__date}>
                    <IconCalendar />
                    { formatter.formatDate(eventData.startDate) } • { formatter.formatTime(eventData.startTime) }
                </div>

                <div className={styles.card__price}>
                    {
                        eventData.ticketPrice ? (
                            eventData.ticketPrice + " ₴"
                        ) : "Free"
                    }
                    {
                        (eventData.ticketsAvailable && eventData.ticketsAvailable.length > 0) && (
                            <div className={styles.card__tickets}>
                                { eventData.ticketsAvailable } tickets
                            </div>
                        )
                    }
                </div>

                <div className={styles.card__interests}>
                    {
                        eventData.interests.map(item => (
                            <div key={item.slug} className={styles.card__interest}>
                                <span>{ item.icon }</span> { item.title_en }
                            </div>
                        ))
                    }
                </div>

                <p className={styles.card__description}>
                    { eventData.description }
                </p>
            </div>
        </div>
    );
};
