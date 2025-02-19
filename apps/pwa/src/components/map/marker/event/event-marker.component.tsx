import { ComponentProps, useState } from "react";
import Image from "next/image";

import styles from "./styles.module.scss";
import cx from "classnames";

import mkr from "@/../public/assets/temp/avatar.png";

export namespace EventMarker {
    export type Props = ComponentProps<"div">;
}

export const EventMarker = ({ className, ...props }: EventMarker.Props) => {
    const [checked, setChecked] = useState(false);
  
    return (
        <div
            className={cx(
                styles.marker,
                className,
            )}
            onClick={() => setChecked(!checked)}
            {...props}
        >
            <div
                className={cx(
                    styles.marker__image,
                    checked && styles.marker__image_selected,
                )}
            >
                <Image fill src={mkr} alt="Marker" />
            </div>
        </div>
    );
};