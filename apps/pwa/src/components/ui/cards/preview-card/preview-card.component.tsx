import { ComponentProps } from "react";
import Image from "next/image";
import { UserProfileEntity } from "@/entities/profile";
import { useLocale } from "next-intl";
import { IconCalendar } from "@/components/icons";
import { formatDate } from "@/utils/time";
import { AttendersSection } from "@/components/ui";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace PreviewCard {
    export type Data = {
        title: string;
        date: Date;
        image: string;
        attendees: UserProfileEntity[];
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const PreviewCard = ({
    title,
    date,
    image,
    attendees,
    className,
    ...props
}: PreviewCard.Props) => {
    const locale = useLocale();
    const formattedDate = formatDate(date, locale);

    return (
        <div
            className={cx(styles.card, className)}
            {...props}
        >
            <div className={styles.card__content}>
                <div className={styles.card__image}>
                    <Image
                        alt={title}
                        src={image}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
                <div className={styles.card__info}>
                    <div className={styles.card__info__date}>
                        <IconCalendar />
                        {formattedDate}
                    </div>
                    <div className={styles.card__info__title}>
                        {title}
                    </div>

                    <AttendersSection size="small" users={attendees} />
                </div>
            </div>
        </div>
    );
};