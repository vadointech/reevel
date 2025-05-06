import { ComponentProps } from "react";
import Image from "next/image";

import { hexToRgba } from "@/utils/hex-to-rgba";

import styles from "../styles.module.scss";

export namespace ProfileHeroCover {
    export type Props = ComponentProps<"div">;
}

export const ProfileHeroCover = ({ ...props }: ProfileHeroCover.Props) => {
    return (
        <>
            <Image
                fill
                src={"/assets/temp/amazon_bg.jpg"}
                alt={"Profile Cover"}
                className={styles.hero__cover}
            />

            <div
                className={styles.hero__overlay}
                style={{
                    background: `linear-gradient(
                        to top,
                        ${hexToRgba("#212529", 0)} 50%,
                        ${hexToRgba("#212529", 0.05)} 58%,
                        ${hexToRgba("#212529", 0.2)} 60%,
                        ${hexToRgba("#212529", 0.4)} 74%,
                        ${hexToRgba("#212529", .6)} 100%
                    )`,
                }}
            />
        </>
    );
};
