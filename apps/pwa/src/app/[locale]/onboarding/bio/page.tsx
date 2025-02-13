import { Avatar, Button, Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { ProgressBar } from "@/components/shared";
import { ArrowBack } from "@/components/icons";
import { OnboardingTextBlock } from "../_components";
import { Input } from "@/components/ui/input";

export default function Page() {
    return (
        <div className={styles.page}>
            <Container>
                <ProgressBar
                    stepCount={4}
                    currentStep={1}
                    controlLeft={<ArrowBack className={styles.controlLeft} strokeWidth={0.3} />}
                />
            </Container>
            <Container className={styles.page__info}>
                <div className={styles.page__circle}>
                    <Avatar size={140} />
                </div>
                <OnboardingTextBlock
                    title={"Tell us About Yourself"}
                    subtitle={"Share your name and a bit about yourself to make your profile unique."}
                    className={styles.page__text}
                />
            </Container>

            <Container>
                <div className={styles.page__data}>
                    <Input
                        label="Full name"
                        placeholder={"Enter your name"}
                        variant="default"
                        inputSize={"default"}
                        hint="It's a hint"

                    />
                    <Input
                        label="Bio"
                        placeholder={"Enter short bio"}
                        variant="default"
                        inputSize={"large"}
                        error="error"
                    />
                </div>
            </Container>

            <Container className={styles.page__buttons}>
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