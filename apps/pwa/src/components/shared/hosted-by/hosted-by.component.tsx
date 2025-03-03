import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Image from "next/image";

import image_1 from "@/../public/assets/temp/carousel2.jpg";
import { EventDate } from "@/components/ui/date";
import { IconMore } from "@/components/icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Avatar } from "@/components/ui";


export namespace HostedBy {
    export type Props = ComponentProps<"div"> & {
        author: string
    };
}


export const HostedBy = ({
    author,
    className,
    ...props
}: HostedBy.Props) => {
    return (
        <div className={cx(styles.container, className)} {...props}>
            <Avatar variant="outline" type="custom" size={25} />
            <div className={styles.container__text}>
                Hosted by <span>{author}</span>
            </div>
        </div>
    );
}
