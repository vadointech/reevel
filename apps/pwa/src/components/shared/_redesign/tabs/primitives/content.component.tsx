import { ComponentProps } from "react";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace TabsContent {
    export type Props = ComponentProps<"div">;
}

export const TabsContent = ({
    className,
    ...props
}: TabsContent.Props) => {
    return (
        <div
            className={cx(styles.content, className)}
            onDrag={(event) => {
                event.preventDefault();
                event.stopPropagation();
            }}
            {...props}
        />
    );
};
