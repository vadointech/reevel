import Image from "next/image";

import { hexToRgba } from "@/utils/hex-to-rgba";

import styles from "../styles.module.scss";
import IconCamera from "@/components/icons/camera";

export namespace ProfileHeroCover {
    export type Data = {
        image: string
        onChangeBackground?: boolean
    };
    export type Props = Data;
}

export const ProfileHeroCover = ({
    onChangeBackground,
    image,
}: ProfileHeroCover.Props) => {
    return (
        <>
            <Image
                fill
                src={image}
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

            {onChangeBackground &&
                <IconCamera className={styles.hero__svg} />
            }
        </>
    );
};
