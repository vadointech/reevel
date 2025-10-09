import { ComponentProps } from "react";
import Image from "next/image";
import { hexToRgba } from "@/utils/hex-to-rgba";

import { Badge, DateBadge } from "@/components/ui";
import { IconLock, IconGlobe, IconCalendar, IconCrown } from "@/components/icons";
import { LocationBadge, AttendeesBadge } from "@/components/ui";
import { dateTime } from "@/features/event/utils";

import { EventEntity, EventParticipationType, EventVisibility } from "@/entities/event";
import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace EventCard {
    type Data = {
        event: EventEntity;
    };

    export type Props = ComponentProps<"div"> & Data & {
        size?: UISize;
        displayMode?: "date" | "location"
    };
}


export const EventCard = ({
    event,
    size = "default",
    displayMode = "location",
    className,
    ...props
}: EventCard.Props) => {

    return (
        <div
            className={cx(
                styles.card,
                styles[`card_size_${size}`],
                className,
            )}
            {...props}
        >
            <Image
                crossOrigin="anonymous"
                fill
                src={event.poster}
                alt={event.title}
                className={styles.card__background}
            />

            <div
                className={cx(
                    styles.card__section,
                    styles[`card__section_size_${size}`],
                )}
                style={{
                    background: `linear-gradient(
                        to bottom,
                        ${hexToRgba(event.primaryColor, 0.5)} 58%,
                        ${hexToRgba(event.primaryColor, 0.4)} 66%,
                        ${hexToRgba(event.primaryColor, 0.2)} 80%,
                        ${hexToRgba(event.primaryColor, 0.05)} 92%,
                        ${hexToRgba(event.primaryColor, 0)} 100%
                    )`,
                }}
            >
                {
                    displayMode === "location" ? (
                        event.participationType === EventParticipationType.HOSTING ? (
                            <Badge
                                variant={"ghost"}
                                size={"small"}
                                iconBefore={<IconCrown />}
                            >
                                Hosted by you
                            </Badge>
                        ) : (
                            <VisibilityIndicator visibility={event.visibility} />
                        )
                    ) : (
                        <Badge
                            variant={"ghost"}
                            size={"small"}
                            iconBefore={<IconCalendar />}
                        >
                            { dateTime.shortFormat(event.startDate) }
                        </Badge>
                    )
                }
            </div>

            <div
                className={cx(
                    styles.card__section,
                    styles[`card__section_size_${size}`],
                )}
                style={{
                    background: `linear-gradient(
                        to top,
                        ${hexToRgba(event.primaryColor, 1)} 44%,
                        ${hexToRgba(event.primaryColor, 0.2)} 80%,
                        ${hexToRgba(event.primaryColor, 0.05)} 92%,
                        ${hexToRgba(event.primaryColor, 0)} 100%
                    )`,
                }}
            >
                {
                    displayMode === "location" ? (
                        <DateBadge size={"small"}>
                            { dateTime.formatRelative(event.startDate) } • { dateTime.formatTime(event.startDate) }
                        </DateBadge>
                    ) : (
                        <LocationBadge size={size}>
                            { event.locationTitle }
                        </LocationBadge>
                    )
                }
                <h3
                    className={cx(
                        styles.card__title,
                        styles[`card__title_size_${size}`],
                    )}
                >
                    { event.title }
                </h3>
                {
                    event.tickets.length > 0 && (
                        <AttendeesBadge
                            size={size}
                            users={event.tickets.map(item => item.user.profile)}
                        />
                    )
                }
            </div>
        </div>
    );
};

const VisibilityIndicator = ({ visibility }: { visibility: EventVisibility }) => {
    if(visibility === EventVisibility.PRIVATE) {
        return (
            <Badge
                variant={"ghost"}
                size={"small"}
                iconBefore={<IconLock />}
            >
                Private
            </Badge>
        );
    }

    return (
        <Badge
            variant={"ghost"}
            size={"small"}
            iconBefore={<IconGlobe />}
        >
            Public
        </Badge>
    );
};
