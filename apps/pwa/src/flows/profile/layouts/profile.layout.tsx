import { PropsWithChildren } from "react";

import styles from "../styles/profile-layout.module.scss";

export namespace ProfileLayout {
    export type Props = PropsWithChildren;
}

export function ProfileLayout({ children }: ProfileLayout.Props) {
    return (
        <div className={styles.layout}>
            { children }
        </div>
    );
}
