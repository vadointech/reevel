import { ComponentProps } from "react";

import cx from "classnames";
import styles from "./styles.module.scss";
import Image from "next/image";

import { UserProfileEntity } from "@/entities/profile";

export type Size = "default" | "small"

export namespace AttendersSection {
    export type Props = ComponentProps<"div"> & {
        users: UserProfileEntity[]
        size: Size,
    };
}

export const AttendersSection = ({
    size,
    users,
    className,
    ...props
}: AttendersSection.Props) => {
    const displayedUsers = users.slice(0, 3);
    const remainingCount = Math.max(0, users.length - 3);

    return (
        <div className={cx(styles.section, className)} {...props}>
            {displayedUsers.map((user) => (
                <div key={user.id} className={cx(
                    styles.section__image,
                    styles[`section__image_${size}`]
                )}>
                    <Image src={user.picture ?? ""} alt="User" fill />
                </div>
            ))}
            {remainingCount > 0 && (
                <div className={cx(
                    styles.section__more,
                    styles[`section__more_${size}`]
                )}>
                    +{remainingCount} more going
                </div>
            )}
        </div>
    );
};
