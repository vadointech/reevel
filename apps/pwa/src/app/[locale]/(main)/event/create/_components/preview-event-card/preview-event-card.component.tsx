import { ComponentProps } from "react";
import Image from "next/image";
import { IconCalendar, IconLock } from "@/components/icons";

import { hexToRgba } from "@/utils/hex-to-rgba";
import { Avatar, Badge } from "@/components/shared/_redesign";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace PreviewEventCard {
    export type Props = ComponentProps<"div">;
}

export const PreviewEventCard = ({
    className,
    ...props
}: PreviewEventCard.Props) => {
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
                        <span>Jimmy Smith</span>
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
                    NYC Outdoor Movie Night
                </h3>

                <div className={styles.card__date}>
                    <IconCalendar />
                    Tuesday, Aug 4 • 18:00
                </div>

                <div className={styles.card__price}>
                    378 ₴
                    <div className={styles.card__tickets}>
                        13 tickets
                    </div>
                </div>

                <div className={styles.card__interests}>
                    <div className={styles.card__interest}>
                        <span>🎧</span> Music
                    </div>
                    <div className={styles.card__interest}>
                        <span>🎧</span> Music
                    </div>
                    <div className={styles.card__interest}>
                        <span>🎧</span> Music
                    </div>
                    <div className={styles.card__interest}>
                        <span>🎧</span> Music
                    </div>
                </div>

                <p className={styles.card__description}>
                    Contrary to popular belief, Lorem Ipsum is not simply random text.
                    It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                    Contrary to popular belief, Lorem Ipsum is not simply random text.
                </p>
            </div>
        </div>
    );
};
