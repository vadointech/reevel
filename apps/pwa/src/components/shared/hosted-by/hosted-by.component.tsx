import { ComponentProps } from "react";
import { Avatar } from "@/components/shared/_redesign";
import { Typography } from "@/components/ui";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace HostedBy {
    export type Props = ComponentProps<"div"> & {
        name: string,
        avatar?: string,
    };
}

export const HostedBy = ({
    name,
    avatar,
    className,
    ...props
}: HostedBy.Props) => {
    return (
        <div
            className={cx(
                styles.container,
                className,
            )}
            {...props}
        >
            <Avatar image={avatar} variant={"outline"} />
            <div>
                <Typography.h3 size={"sm"} className={styles.container__text}>
                    Hosted by
                </Typography.h3>
                <Typography.span size={"sm"}>{ name }</Typography.span>
            </div>
        </div>
    );
};
