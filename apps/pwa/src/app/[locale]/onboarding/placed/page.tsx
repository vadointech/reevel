

import { Container, Input } from "@/components/ui";
import { Place } from "../_components/place";
import styles from "./styles.module.scss";
import { ProgressBar } from "@/components/shared";
import { Back } from "@/components/icons";

export default function Page() {
    return (
        <div className={styles.page}>
            <Container>
                <ProgressBar
                    stepCount={4}
                    currentStep={0}
                    text={'Enter your location'}
                    mode="text"
                    type="shortBack"
                />
            </Container>
            <Container>
                <Input variant="rounded" placeholder="Search events" background="muted" icon={<Back />} />
            </Container>
            <Container>
                <Place city="Vinnitsa" country="Vinnitsa, Ukraine" selected />
            </Container>
        </div>
    );
}