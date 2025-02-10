import Image from "next/image";

import styles from "./styles.module.scss";

import avatar from "@/../public/assets/temp/avatar.png";

export namespace Avatar {

  export type Variant = "default" | "outlined" | "profile"

  export type Size = "default" | "large"

  export type Props = {
    variant?: Variant;
    size?: Size | number;
  }
}

export const Avatar = ({
    size = "default",
}: Avatar.Props) => {

    const sizeMap: Record<Avatar.Size, number> = {
        default: 32,
        large: 36
    };

    const itemSize = typeof size === "number" ? size : sizeMap[size];

    return (
        <div
            className={styles.avatar}
            style={{
                width: itemSize
            }}
        >
            <Image
                fill
                src={avatar}
                alt={"avatar"}
            />
        </div>
    );
};