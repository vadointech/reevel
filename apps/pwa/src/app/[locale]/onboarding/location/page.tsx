import { Button, Container } from "@/components/ui";
import { OnboardingTextBlock } from "../_components";

import styles from "./styles.module.scss";

export default function Page() {
    return (
        <>
            <Container>
                <div
                    className={styles.icon}
                >
                    <span>
                        📍
                    </span>
                </div>
                <OnboardingTextBlock
                    title={"What is Your Location?"}
                    subtitle={"To find nearby events share your location with us"}
                    className={styles.page__text}
                />
            </Container>

            <Container className={styles.page__buttons}>
                <Button>
                    Enter Location Manually
                </Button>
                <Button
                    variant={"primary"}
                >
                    Allow Location Access
                </Button>
            </Container>
        </>
    );
}