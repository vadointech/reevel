import { ComponentProps } from "react";
import { IconNavigation } from "@/components/icons";

import styles from "./styles.module.scss";
import cx from "classnames";


export namespace Place {
    export type Props = ComponentProps<"div"> & {
        place: string,
        iconHeight?: number,
        iconWidth?: number,
    };
}

export const Place = ({
    place,
    iconHeight = 14,
    iconWidth = 14,
    className,
    ...props
}: Place.Props) => {
    return (
        <div className={cx(styles.place, className)} {...props}>
            <IconNavigation width={iconWidth} height={iconHeight} />
            {place}
        </div>
    );
};