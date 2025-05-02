import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

import { Avatar } from "@/components/ui";

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
        <div className={cx(styles.container, className)} {...props}>
            <Avatar src={avatar} variant="outline" type="custom" size={32} />
            <div className={styles.container__text}>
                <div>Hosted by</div> <span>{name}</span>
            </div>
        </div>
    );
};
