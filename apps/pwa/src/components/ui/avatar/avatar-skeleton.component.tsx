import styles from "./styles.module.scss";
import cx from "classnames";

export namespace AvatarSkeleton {
    export type Props = {
        size?: number;
    };
}

export const AvatarSkeleton = ({
    size,
    ...props
}: AvatarSkeleton.Props) => {
    return (
        <div
            className={cx(
                styles.avatar,
                styles.skeleton,
            )}
            style={{ height: size }}
            {...props}
        >
        </div>
    );
};
