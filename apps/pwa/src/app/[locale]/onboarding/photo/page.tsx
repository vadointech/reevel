import { OnboardingAvatarPicker, OnboardingTextBlock } from "../_components";
import { ProgressBar } from "@/components/shared";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

import styles from "./styles.module.scss";

export default function Page() {
    return (
        <div className={styles.page}>

            <Container>
                <ProgressBar
                    stepCount={4}
                    currentStep={0}
                />
            </Container>

            <Container>
                <OnboardingTextBlock
                    title={"Show Off Yourself!"}
                    subtitle={"You can select photo from the list below or add you own photo as profile picture"}
                    className={styles.page__text}
                />

                <OnboardingAvatarPicker />
            </Container>

            <Container className={styles.page__buttons}>
                <Button variant={"default"}>
                  Upload custom photo
                </Button>

                <Button variant={"primary"}>
                  Upload custom photo
                </Button>
            </Container>

        </div>
    );
}