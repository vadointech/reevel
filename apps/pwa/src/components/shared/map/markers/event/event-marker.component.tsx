import Image from "next/image";
import { ComponentProps } from "react";
import { observer } from "mobx-react-lite";
import { BasePoint } from "../../types";

import { GooglePlacesApiIncludedTypesMarker } from "@/features/location/picker/config/icons.config";
import { GooglePLacesApiIncludedTypes } from "@/api/google/places/included-types.config";

import marker from "../styles.module.scss";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace EventMarker {
    export type Point = BasePoint;

    export type Props = ComponentProps<"div"> & {
        point: Point;
        selected?: boolean;
        active?: boolean;
    };
}

export const EventMarker = observer(({
    className,
    point,
    selected = false,
    active = false,
    ...props
}: EventMarker.Props) => {

    const getIcon = () => {
        if(!point.primaryType) return GooglePlacesApiIncludedTypesMarker.default;

        const defined = GooglePlacesApiIncludedTypesMarker[point.primaryType as GooglePLacesApiIncludedTypes];
        if(defined) return defined;

        const related = Object.keys(GooglePlacesApiIncludedTypesMarker).find(key => point.primaryType?.includes(key));
        if(related) return GooglePlacesApiIncludedTypesMarker[related as GooglePLacesApiIncludedTypes];

        return GooglePlacesApiIncludedTypesMarker.default;
    };

    const icon = getIcon();

    return (
        <div
            className={cx(
                styles.marker,
                marker.marker,
                marker.marker_enter,
                selected && marker.marker_selected,
                active ? marker.marker_active : marker.marker_unactive,
                className,
            )}
            {...props}
        >

            <span
                className={styles.marker__point}
                style={{ backgroundColor: icon.primaryColor }}
            />
            <div className={styles.marker__content}>
                {
                    point.image ? (
                        <Image
                            width={300}
                            height={300}
                            src={point.image || "http://localhost:3000/assets/temp/valentine.png"}
                            alt={"Marker"}
                            className={styles.marker__image}
                        />
                    ) : null
                }

                {
                    point.icon ? (
                        <div
                            className={styles.marker__icon}
                            style={{
                                background: `linear-gradient(
                                    to bottom,
                                    ${icon.secondaryColor} 0%,
                                    ${icon.primaryColor} 100%
                                )`,
                            }}
                        >
                            { icon.icon }
                        </div>
                    ) : null
                }
            </div>


            {
                point.label ? (
                    <label
                        className={styles.marker__label}
                        style={{
                            color: icon ? icon.primaryColor : undefined,
                        }}
                    >
                        { point.label }
                    </label>
                ) : null
            }
        </div>
    );
});