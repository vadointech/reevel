import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Image from "next/image";

import image_1 from "@/../public/assets/temp/carousel1.jpg";

export namespace RecentCard {
    export type Props = ComponentProps<"div"> & {

    };
}


export const RecentCard = ({
    className,
    ...props
}: RecentCard.Props) => {
    return (
        <div className={cx(styles.recent, className)} {...props}>
            <Image
                fill
                src={image_1}
                alt="Franchise logo"
            />
        </div>
    );
}
