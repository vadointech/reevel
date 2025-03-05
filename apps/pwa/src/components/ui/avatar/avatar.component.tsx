import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
}: Avatar.Props) => {

    const sizeMap: Record<Avatar.Size, number> = {
        default: 32,
        large: 36,
    };

    const itemSize = typeof size === "number" ? size : sizeMap[size];

    return (
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
    );
};