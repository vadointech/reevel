import { PropsWithChildren } from "react";
import { OnboardingProgress } from "@/app/[locale]/onboarding/_components";

import styles from "./styles.module.scss";

export default function OnboardingLayout({ children }: PropsWithChildren) {
    return (
        <div className={styles.layout}>
            <OnboardingProgress />
            { children }
        </div>
    );
}