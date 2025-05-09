import { ComponentProps } from "react";

import styles from "./styles.module.scss";

export namespace ProfilePageLayout {
    export type Props = ComponentProps<"div">;
}

export const ProfilePageLayout = ({ children, ...props }: ProfilePageLayout.Props) => {
    return (
        <div
            className={styles.layout}
            {...props}
        >
            { children }
        </div>
    );
};
