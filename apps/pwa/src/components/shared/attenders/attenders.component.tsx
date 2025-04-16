import { ComponentProps } from "react";

import cx from "classnames";
import styles from "./styles.module.scss";
import Image from "next/image";
import { UserEntity } from "@/entities/user";
import { UserProfileEntity } from "@/entities/profile";

export namespace AttendersSection {
    export type Props = ComponentProps<"div"> & {
        users: UserProfileEntity[]
    };
}

export const AttendersSection = ({
    users,
    className,
    ...props
}: AttendersSection.Props) => {
    const displayedUsers = users.slice(0, 3);
    const remainingCount = Math.max(0, users.length - 3);

    return (
        <div className={styles.section}>
            {displayedUsers.map((user) => (
                <div key={user.id} className={styles.section__image}>
                    <Image src={user.picture ?? ""} alt="User" fill />
                </div>
            ))}
            {remainingCount > 0 && (
                <div className={styles.section__more}>
                    +{remainingCount} more going
                </div>
            )}
        </div>
    );
};
