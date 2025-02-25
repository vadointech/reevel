import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Image from "next/image";

import image_1 from "@/../public/assets/temp/carousel1.jpg";
import { EventDate } from "@/components/ui/date";
import { More } from "@/components/icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export namespace RecentCard {
    export type Props = ComponentProps<"div"> & {
        title: string;
        img: string | StaticImport;
        // date: number
    };
}


export const RecentCard = ({
    title,
    img = image_1,
    className,
    ...props
}: RecentCard.Props) => {
    return (
        <div className={cx(styles.card, className)} {...props}>
            <div className={styles.card__image}>
                <Image
                    fill
                    src={image_1}
                    alt={title}
                />
            </div>

            <div className={styles.card__info}>
                <h3 className={styles.card__info__title}>{title}</h3>
                <EventDate />
            </div>
            <div className={styles.card__more}><More /></div>
        </div>
    );
}
