import { ComponentProps } from "react";
import { Avatar } from "@/components/ui";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace HostedBy {
    export type Props = ComponentProps<"div"> & {
        avatar?: string,
    };
}

export const HostedBy = ({
    avatar,
    className,
    children,
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
            <div className={styles.container__text}>
                <h3>Hosted by</h3>
                <span>
                    { children }
                </span>
            </div>
        </div>
    );
};
