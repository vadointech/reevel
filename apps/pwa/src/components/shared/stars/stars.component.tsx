import { ComponentProps, useState } from "react";
import styles from "./styles.module.scss";

export namespace Stars {
    export type Props = ComponentProps<"div"> & {
        count: number,
        defaultRating: string,
        icon?: string,
        color?: string,
        iconSize?: number,
        readonly?: boolean,
    }
}

const DEFAULT_UNSELECTED_COLOR = "#E8E9EA";

export const Stars = ({
    count = 5,
    defaultRating,
    icon = "★",
    color = "#FFC93F",
    iconSize,
    readonly = false,
    ...props
}: Stars.Props) => {
    const [rating, setRating] = useState(defaultRating);
    const [temporaryRating, setTemporaryRating] = useState(0);

    let stars = Array(count).fill(icon);

    const handleClick = (rating: number) => {
        if (readonly) return;
        setRating(rating.toString());
        localStorage.setItem("starRating", rating.toString());
    };

    return (
        <div className={styles.starsContainer}>
            {stars.map((item, index) => {
                const isActiveColor =
                    (rating || temporaryRating) &&
                    (index < +rating || (!readonly && index < temporaryRating));

                let elementColor = "";

                if (isActiveColor) {
                    elementColor = color;
                } else {
                    elementColor = DEFAULT_UNSELECTED_COLOR;
                }

                return (
                    <div
                        className="star"
                        key={index}
                        style={{
                            fontSize: iconSize ? `${iconSize}px` : "14px",
                            color: elementColor,
                            filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
                        }}
                        onMouseEnter={() => !readonly && setTemporaryRating(index + 1)}
                        onMouseLeave={() => !readonly && setTemporaryRating(0)}
                        onClick={() => handleClick(index + 1)}
                    >
                        {icon}
                    </div>
                );
            })}
        </div>
    );
};