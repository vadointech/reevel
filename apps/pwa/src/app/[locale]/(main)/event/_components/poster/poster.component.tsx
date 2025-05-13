import Image, { StaticImageData } from "next/image";
import styles from "./styles.module.scss";

import cx from "classnames";
import { IconCheck } from "@/components/icons";
import { ComponentProps } from "react";


export namespace Poster {
    export type Props = Omit<ComponentProps<"div">, "onClick"> & {
        size: "small" | "default"
        className?: string;
        src?: string | StaticImageData;
        selected?: boolean
        onClick?: () => void;
    };
}




export const Poster = ({
    src = "",
    size,
    selected,
    className,
    onClick,
    ...props
}: Poster.Props) => {

    return (
        <div className={
            cx(
                styles.poster,
                styles[`poster__size_${size}`],
                selected && styles.poster__selected,
            )}
        onClick={onClick}
        {...props}>
            <Image
                fill
                src={src}
                alt="Franchise logo"
            />

            {selected &&
                <div className={styles.poster__mark}>
                    <Check />
                </div>
            }
        </div>
    );
};

