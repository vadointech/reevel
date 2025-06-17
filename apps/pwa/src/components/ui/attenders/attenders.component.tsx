import { ComponentProps } from "react";

import { UserProfileEntity } from "@/entities/profile";
import { Avatar } from "@/components/ui";
import { UISize } from "@/types/common";

import cx from "classnames";
import styles from "./styles.module.scss";

export namespace AttendersSection {
    export type Props = ComponentProps<"div"> & {
        users: UserProfileEntity[]
        size?: UISize,
    };
}

export const AttendersSection = ({
    size = "default",
    users,
    className,
    ...props
}: AttendersSection.Props) => {
    const displayedUsers = users.slice(0, 3);
    const remainingCount = Math.max(0, users.length - 3);

    return (
        <div
            className={cx(
                styles.section,
                styles[`section__size_${size}`],
                className,
            )}
            {...props}
        >
            {
                displayedUsers.map((user) => (
                    <Avatar
                        key={user.id}
                        image={user.picture}
                        variant={"bordered"}
                    />
                ))
            }
            {
                remainingCount > 0 && (
                    <div
                        className={cx(
                            styles.section__more,
                            styles[`section__more_size_${size}`],
                        )}
                    >
                        +{remainingCount} more going
                    </div>
                )
            }
        </div>
    );
};
