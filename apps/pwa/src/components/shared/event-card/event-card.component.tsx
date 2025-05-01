import { ComponentProps, ReactNode } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Image from "next/image";

import { IconCalendar, IconLock, IconWorld } from "@/components/icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Badge } from "@/components/ui/badge/badge.component";
import { Place } from "@/components/ui/place";
import { AttendersSection } from "../attenders";
import { hexToRgba } from "@/utils/colorOpacity";

const defaultPosters = [
    { id: 1, picture: "http://localhost:3000/assets/temp/valentine.png" },
    { id: 2, picture: "http://localhost:3000/assets/temp/poster1.jpg" },
    { id: 3, picture: "http://localhost:3000/assets/temp/poster2.png" },
    { id: 4, picture: "http://localhost:3000/assets/temp/poster3.png" },
    { id: 5, picture: "http://localhost:3000/assets/temp/poster4.png" },
];

export type BadgeType = 'Public' | 'Private' | string;
export type SizeType = "default" | "small"




export namespace EventCard {
    export type Props = ComponentProps<"div"> & {
        title: string;
        src: string | StaticImport
        place: string
        badge: BadgeType;
        size?: SizeType;
        gradientColor?: string;
    };
}


export const EventCard = ({
    title,
    src,
    place,
    badge,
    size = "default",
    gradientColor,
    className,
    ...props
}: EventCard.Props) => {


    const icon: Record<string, ReactNode> = {
        Public: <IconWorld />,
        Private: <IconLock />,
    };

    return (
        <div
            className={cx(
                styles.card,
                styles[`card_${size}`],
                className
            )}
            style={{
                ...(gradientColor && {
                    ['--bottom-color' as any]: gradientColor,
                    ['--top-color' as any]: hexToRgba(gradientColor, 0.5),
                }),
            }}
            {...props}>
            <Image
                alt="image"
                src={src}
                fill
            />

            <div className={styles.card__content}>
                <Badge title={badge} icon={icon[badge] ?? <IconCalendar />} className={styles.badge} />

                <div className={styles.card__content__below}>
                    <Place place={place} iconHeight={10} iconWidth={10} className={styles.place} />
                    <h3 >{title}</h3>
                    {/* @ts-ignore */}
                    <AttendersSection size="small" users={defaultPosters} className={styles.card__attenders} />
                </div>
            </div>
        </div>
    );
}
