import { ComponentProps } from "react";

import { IconStar } from "@/components/icons";
import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Stars {
    export type Props = ComponentProps<"div"> & {
        count: number;
        length?: number;
        size?: UISize
    };
}

export const Stars = ({
    count,
    length = 5,
    size = "default",
    className,
    ...props
}: Stars.Props) => {

    const getFillWidth = (index: number): string => {
        let width = 0;
        if(count > index + 1) width = 1;
        else if(count > index) width = count - index;
        return width * 100 + "%";
    };

    return (
        <div
            className={cx(
                styles.stars,
                styles[`stars_size_${size}`],
                className,
            )}
            {...props}
        >
            {
                Array.from({ length }).map((_, index) => (
                    <div
                        key={`start-bg-${index}`}
                        className={styles.stars__star}
                    >
                        <IconStar />

                        <div
                            className={styles.stars__overlay}
                            style={{ width: getFillWidth(index) }}
                        >
                            <IconStar />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
