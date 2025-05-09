import { ComponentProps, ReactNode } from "react";
import Image from "next/image";

import { Badge, Container, Typography } from "@/components/ui";
import { IconCalendar, IconEllipsisHorizontal, IconLocation, IconLock, IconNavigation, IconShare, IconTicket, IconWorld } from "@/components/icons";

import { hexToRgba } from "@/utils/hex-to-rgba";

import { UserProfileEntity } from "@/entities/profile";
import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";
import { AttendersSection } from "@/components/shared/attenders";
import { HostedBy } from "@/components/shared/hosted-by";
import { formatDate } from "@/utils/time";
import { useLocale } from "next-intl";
import { EventDrawerContentDescription } from "@/components/drawers/event/content/primitives/description";
import { ScrollSection } from "@/components/sections";
import { InterestButton } from "@/components/shared/_redesign";

const defaultAttendees: UserProfileEntity[] = [
    { id: "1", userId: "", completed: "true", picture: "http://localhost:3000/assets/temp/valentine.png" },
    { id: "2", userId: "", completed: "true", picture: "http://localhost:3000/assets/temp/poster1.jpg" },
    { id: "3", userId: "", completed: "true", picture: "http://localhost:3000/assets/temp/poster2.png" },
    { id: "4", userId: "", completed: "true", picture: "http://localhost:3000/assets/temp/poster3.png" },
    { id: "5", userId: "", completed: "true", picture: "http://localhost:3000/assets/temp/poster4.png" },
];

export namespace PreviewCard {
    export type EventType = "Public" | "Private";
    type Data = {
        poster: string;
        primaryColor: string;
        title: string;
        location: string;
        price: string;
        currency: string,
        date: Date
        description: string,
        // type: EventType;
        size?: UISize;
    };

    export type Props = ComponentProps<"div"> & Data;
}


export const PreviewCard = ({
    title,
    size = "default",
    primaryColor,
    poster,
    date,
    description,
    currency,
    price,
    // type,
    location,
    className,
    ...props
}: PreviewCard.Props) => {
    const icon: Record<PreviewCard.EventType, ReactNode> = {
        Public: <IconWorld />,
        Private: <IconLock />,
    };

    const locale = useLocale();

    const formattedDate = formatDate(date, locale)

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
                    src={poster}
                    alt={title}
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
                    avatar={"/assets/temp/avatar.png"}
                    name={"Jimmy Smith"}
                />
            </div>

            <div
                className={cx(
                    styles.card__section,
                    styles[`card__section_size_${size}`],
                )}
                style={{
                    background: `linear-gradient(
                        to top,
                        ${hexToRgba(primaryColor, 1)} 70%,

                        ${hexToRgba(primaryColor, 0)} 100%
                    )`,
                }}
            >
                <div
                    className={styles.info}
                >
                </div>
                <h1 className={styles.info__title}>
                    {title}
                </h1>

                <div className={styles.info__date}>
                    <IconCalendar />
                    <span>
                        {formattedDate}
                    </span>
                </div>

                <div className={styles.info__price}>
                    <span>
                        {price} {currency}
                    </span>
                </div>

                <ScrollSection container={false} size={"small"}>
                    {
                        Array.from({ length: 8 }).map((_, index) => (
                            <InterestButton
                                variant="outline"
                                key={index}
                                icon={"🥊"}
                            >
                                Boxing
                            </InterestButton>
                        ))
                    }
                </ScrollSection>

                {/* <EventDrawerContentDescription>
                    <span className={styles.test}>{description}</span>
                </EventDrawerContentDescription> */}

            </div>
        </div>
    );
};
