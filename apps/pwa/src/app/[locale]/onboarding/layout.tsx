import { PropsWithChildren } from "react";
import { Container } from "@/components/ui";
import { OnboardingProgress } from "./_components";

import styles from "./styles.module.scss";

export default function OnboardingLayout({ children }: PropsWithChildren) {
    return (
        <div className={styles.layout}>
            <Container>
                <OnboardingProgress />
            </Container>
            { children }
        </div>
    );
}