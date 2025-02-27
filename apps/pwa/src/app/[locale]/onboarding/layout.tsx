import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

export default async function OnboardingLayout({ children }: PropsWithChildren) {
    return (
        <div className={styles.layout}>
            { children }
        </div>
    );
}