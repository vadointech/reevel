import { ComponentProps, ReactNode } from "react";
import Image from "next/image";

import { Badge, Typography } from "@/components/ui";
import { IconLock, IconNavigation, IconWorld } from "@/components/icons";

import { hexToRgba } from "@/utils/hex-to-rgba";

import { UserProfileEntity } from "@/entities/profile";
import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";
import { AttendersSection } from "@/components/shared/attenders";

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
        // location: string;
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
    // type,
    // location,
    className,
    ...props
}: PreviewCard.Props) => {
    const icon: Record<PreviewCard.EventType, ReactNode> = {
        Public: <IconWorld />,
        Private: <IconLock />,
    };

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
                fill
                src={poster}
                alt={title}
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
                        ${hexToRgba(primaryColor, 0.5)} 58%,
                        ${hexToRgba(primaryColor, 0.4)} 66%,
                        ${hexToRgba(primaryColor, 0.2)} 80%,
                        ${hexToRgba(primaryColor, 0.05)} 92%,
                        ${hexToRgba(primaryColor, 0)} 100%
                    )`,
                }}
            >
                <h1>test</h1>
            </div>

            <div
                className={cx(
                    styles.card__section,
                    styles[`card__section_size_${size}`],
                )}
                style={{
                    background: `linear-gradient(
                        to top,
                        ${hexToRgba(primaryColor, 1)} 44%,
                        ${hexToRgba(primaryColor, 0.2)} 80%,
                        ${hexToRgba(primaryColor, 0.05)} 92%,
                        ${hexToRgba(primaryColor, 0)} 100%
                    )`,
                }}
            >
                <h1>test</h1>
            </div>
        </div>
    );
};
