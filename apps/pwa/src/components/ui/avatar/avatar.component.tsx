import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

import styles from "./styles.module.scss";

import avatar from "@/../public/assets/temp/avatar.png";

export namespace Avatar {

    export type Variant = "default" | "outlined" | "profile";

    export type Size = "default" | "large";

    export type Props = {
        variant?: Variant;
        size?: Size | number;
        src?: string | StaticImport;
    };
}

export const Avatar = ({
    size = "default",
    src = avatar,
    variant = "profile",
}: Avatar.Props) => {

    const sizeMap: Record<Avatar.Size, number> = {
        default: 32,
        large: 36,
    };

    const itemSize = typeof size === "number" ? size : sizeMap[size];

    // Не знаю чи доречно тут так робити, можна зробити просто в рендер винести і ставити просто стиль в залежності від варіанту
    // Але тоді завжди буде лишній div, той що для circle
    const AvatarView: Record<Avatar.Variant, ReactNode> = {
        default: (
            <div
                className={styles.avatar}
                style={{
                    width: itemSize,
                }}
            >
                <Image
                    fill
                    src={src}
                    alt={"avatar"}
                />
            </div>
        ),
        outlined: (
            <></>
        ),
        profile: (
            <div className={styles.avatar__variant_profile}>
                <div
                    className={styles.avatar}
                    style={{
                        width: itemSize,
                    }}
                >
                    <Image
                        fill
                        src={src}
                        alt={"avatar"}
                    />
                </div>
            </div>
        ),
    };

    return (
        <>
            {AvatarView[variant]}
        </>
    );
};