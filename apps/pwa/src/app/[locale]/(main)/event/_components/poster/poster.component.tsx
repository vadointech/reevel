import Image, { StaticImageData } from "next/image";
import styles from "./styles.module.scss"

import image_1 from "@/../public/assets/temp/carousel1.jpg";


import cx from "classnames"
import { Check } from "@/components/icons";
export namespace Poster {
    export type Props = {
        size: "small" | "default"
        className?: string;
        src?: string | StaticImageData;
        selected?: boolean
    };
}


export const Poster = ({
    src = '',
    size,
    selected,
    className,
    ...props
}: Poster.Props) => {

    return (
        <div className={
            cx(
                styles.poster,
                styles[`poster__size_${size}`],
                selected && styles.poster__selected
            )}
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
    )
};

