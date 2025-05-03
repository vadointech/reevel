import { ComponentProps } from "react";

import styles from "./styles.module.scss";

export namespace Typography {
    export type Props = ComponentProps<"div">;
}

export const Typography = ({ ...props }: Typography.Props) => {
    return (
        <div {...props}>

        </div>
    );
};
