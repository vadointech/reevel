import { ComponentProps, ReactNode } from "react";
import Image from "next/image";

import { IconCalendar, IconEllipsisHorizontal, IconLocation, IconLock, IconNavigation, IconShare, IconTicket, IconWorld } from "@/components/icons";

import { hexToRgba } from "@/utils/hex-to-rgba";

import { UserProfileEntity } from "@/entities/profile";
import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";
import { HostedBy } from "@/components/shared/hosted-by";

import { useLocale } from "next-intl";

import { InterestButton } from "@/components/shared/_redesign";
import { useEventStore } from "@/features/event";
import { useSessionStore } from "@/features/session";
import { prominent } from 'color.js'
import { formatDate } from "@/utils/time";
import { Badge } from "@/components/ui";


export namespace PreviewCard {
    export type EventType = "Public" | "Private";
    type Data = {
        primaryColor: string;
        currency: string;
        size?: UISize;
    };

    export type Props = ComponentProps<"div"> & Data;
}


export const PreviewCard = ({
    title,
    size = "default",
    primaryColor,
    currency,
    className,
    ...props
}: PreviewCard.Props) => {
    const icon: Record<PreviewCard.EventType, ReactNode> = {
        Public: <IconWorld />,
        Private: <IconLock />,
    };


    const locale = useLocale();
    const eventStore = useEventStore()
    const sessionStore = useSessionStore()

    const combinedDate = new Date(eventStore.dateStore.startDate);
    combinedDate.setHours(parseInt(eventStore.dateStore.startHour));
    combinedDate.setMinutes(parseInt(eventStore.dateStore.startMinute));

    const date = formatDate(combinedDate, locale)
    return (
        <div
            className={cx(
                styles.card,
                styles[`card_size_${size}`],
                className,
            )}
            {...props}
        >
            <div className={styles.card__background}>
                <Image
                    fill
                    src={"/assets/temp/carousel2.jpg"}
                    alt={eventStore.title}
                />
            </div>

            <div
                className={cx(
                    styles.card__section,
                    styles[`card__section_size_${size}`],
                )}
                style={{
                    background: `linear-gradient(
                        to bottom,
                        ${hexToRgba(primaryColor, 0.5)} 58%,
                        ${hexToRgba(primaryColor, 0.4)} 66%,
                        ${hexToRgba(primaryColor, 0.2)} 80%,
                        ${hexToRgba(primaryColor, 0.05)} 92%,
                        ${hexToRgba(primaryColor, 0)} 100%
                    )`,
                }}
            >
                <HostedBy
                    avatar={sessionStore.user?.profile.picture}
                    name={sessionStore.user?.profile.fullName ?? "uknown"}
                />
                <Badge variant="ghost" icon={icon[eventStore.type]} >
                    test
                </Badge>
            </div>

            <div
                className={cx(
                    styles.card__section,
                    styles.card__section_bottom,
                    styles[`card__section_size_${size}`],
                )}
                style={{
                    background: `linear-gradient(
                        to top,
                        ${hexToRgba(primaryColor, 1)} 67%,
                        ${hexToRgba(primaryColor, 0)} 100%
                    )`,
                }}
            >
                <div
                    className={styles.info}
                >
                </div>
                <h1 className={styles.info__title}>
                    {eventStore.title}
                </h1>

                <div className={styles.info__date}>
                    <IconCalendar />
                    <span>
                        {date}
                    </span>
                </div>

                <div className={styles.info__meta}>
                    <span>
                        {eventStore.price} {currency}
                    </span>
                    <div className={styles.info__meta__tickets}>
                        {`${eventStore.tickets} tickets`}
                    </div>
                </div>
                <div className={styles.info__interests}>
                    {
                        eventStore.interests.map((item, index) => (
                            <InterestButton
                                variant="outline"
                                key={index}
                                icon={item.icon}
                            >
                                {item.title_en}
                            </InterestButton>
                        ))
                    }
                </div>
                <div className={styles.info__description}>
                    <span>{eventStore.description}</span>
                </div>
            </div>
        </div>
    );
};
