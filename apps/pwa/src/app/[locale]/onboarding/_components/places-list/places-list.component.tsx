import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Check, Navigation } from "@/components/icons";
import { Place } from "../place/place.component";


export namespace PlacesList {
    export type Props = ComponentProps<"div"> & {
        locations: { city: string, country: string }[];
    };
}

export const PlacesList = ({ locations, ...props }: PlacesList.Props) => {

    return (
        <div className={styles.container}>
            {locations.map((item, i) => (
                <Place city={item.city} country={item.country} />
            ))}
        </div>
    );
};
