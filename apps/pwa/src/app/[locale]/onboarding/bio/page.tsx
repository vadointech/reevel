import { Avatar, Container } from "@/components/ui";

import { ArrowBack } from "@/components/icons";
import { NextStepButton, OnboardingProgress, OnboardingTextBlock } from "../_components";
import { Input } from "@/components/ui/input";

import styles from "./styles.module.scss";

export default function Page() {
    return (
        <>
            <Container>
                <OnboardingProgress />
            </Container>
            <Container>
                <div className={styles.page__info}>
                    <div className={styles.page__circle}>
                        <Avatar size={140} />
                    </div>
                    <OnboardingTextBlock
                        title={"Tell us About Yourself"}
                        subtitle={"Share your name and a bit about yourself to make your profile unique."}
                        className={styles.page__text}
                    />
                </div>
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
                <NextStepButton
                    variant={"primary"}
                    iconAfter={<ArrowBack />}
                >
                    Next step
                </NextStepButton>
            </Container>
        </>
    );
}