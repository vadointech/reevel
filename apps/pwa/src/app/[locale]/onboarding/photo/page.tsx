import { OnboardingAvatarPicker, OnboardingTextBlock } from "../_components";
import { ProgressBar } from "@/components/shared";
import { ArrowBack } from "@/components/icons";
import { Button, Container } from "@/components/ui";

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
                <Button>
                  Upload custom photo
                </Button>

                <Button
                    variant={"primary"}
                    iconAfter={<ArrowBack />}
                >
                  Next step
                </Button>
            </Container>
        </div>
    );
}