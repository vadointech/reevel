import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Image from "next/image";

import image_1 from "@/../public/assets/temp/carousel2.jpg";
import { EventDate } from "@/components/ui/date";
import { IconMore } from "@/components/icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Type = 'horizontal' | 'vertical'

export namespace EventCard {
    export type Props = ComponentProps<"div"> & {
        type?: Type;
    };
}


export const EventCard = ({
    type,
    className,
    ...props
}: EventCard.Props) => {
    return (
        <div className={cx(styles.card, className)} {...props}>
            <Image
                alt="image"
                src={image_1}
                fill
            />
        </div>
    );
}
