import Image from "next/image";
import { ComponentProps } from "react";
import { observer } from "mobx-react-lite";
import { BasePoint } from "../../types";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace EventMarker {
    export type Point = BasePoint & {
        image?: string;
    };

    export type Props = ComponentProps<"div"> & {
        point: Point;
        selected?: boolean;
    };
}

export const EventMarker = observer(({
    className,
    point,
    selected = false,
    ...props
}: EventMarker.Props) => {
    return (
        <div
            className={cx(
                styles.marker,
                className,
            )}
            {...props}
        >
            <div
                className={cx(
                    styles.marker__image,
                    selected && styles.marker__image_selected,
                )}
            >
                {/*TODO: Replace by fallback image src*/}
                <Image fill src={"http://localhost:3000/assets/temp/valentine.png"} alt="Marker" />
            </div>
        </div>
    );
});