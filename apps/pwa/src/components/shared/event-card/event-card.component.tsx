import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Image from "next/image";

import { IconCalendar, IconMore } from "@/components/icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { HostedBy } from "../hosted-by";
import { Badge } from "@/components/ui/badge/badge.component";

export type Type = 'horizontal' | 'vertical'

export namespace EventCard {
    export type Props = ComponentProps<"div"> & {
        type?: Type;
        author: string;
        date: string;
        title: string;
        descr: string;
        src: string | StaticImport
    };
}


export const EventCard = ({
    title,
    descr,
    src,
    author,
    date,
    type,
    className,
    ...props
}: EventCard.Props) => {
    return (
        <div className={cx(styles.card, className)} {...props}>
            <Image
                alt="image"
                src={src}
                fill
            />

            <div className={styles.card__content}>
                <HostedBy author={author} />

                <div className={styles.card__content__below}>
                    <Badge title={date} variant="date" icon={<IconCalendar height={8} width={8} />} />
                    <h3>{title}</h3>
                    <p>{descr}</p>
                </div>
            </div>
        </div>
    );
}
