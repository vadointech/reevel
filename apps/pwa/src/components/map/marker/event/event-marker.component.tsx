import { ComponentProps, useCallback, useMemo } from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { markerStore } from "@/components/map/api";

import styles from "./styles.module.scss";
import cx from "classnames";

import mkr from "@/../public/assets/temp/avatar.png";

export namespace EventMarker {
    export type Props = ComponentProps<"div"> & {
        point: [number, number];
    };
}

export const EventMarker = observer(({
    className,
    point,
    ...props
}: EventMarker.Props) => {

    const markerId = useMemo(() => {
        return markerStore.getMarkerId(point);
    }, [point]);

    const handleToddleMarker = useCallback(() => {
        if(markerStore.selectedMarker === markerId) {
            markerStore.setMarker(null);
        } else {
            markerStore.setMarker(markerId);
        }
    }, [markerId]);

    return (
        <div
            className={cx(
                styles.marker,
                className,
            )}
            onClick={handleToddleMarker}
            {...props}
        >
            <div
                className={cx(
                    styles.marker__image,
                    markerStore.selectedMarker === markerId && styles.marker__image_selected,
                )}
            >
                <Image fill src={mkr} alt="Marker" />
            </div>
        </div>
    );
});