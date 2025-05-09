import { ComponentProps } from "react";
import { Avatar } from "@/components/shared/_redesign";

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
                <h3 className={styles.container__text}>
                    Hosted by
                </h3>
                <span>{ name }</span>
            </div>
        </div>
    );
};
