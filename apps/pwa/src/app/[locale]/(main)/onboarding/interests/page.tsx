import { Container } from "@/components/ui";
import { ArrowBack } from "@/components/icons";
import { OnboardingInterestsPicker } from "./_components";
import { NextStepButton, OnboardingProgress, OnboardingTextBlock } from "../_components";
import { getInitialInterests } from "@/api/interests";
import { headers } from "next/headers";

import styles from "./styles.module.scss";

export default async function Page() {

    const { data } = await getInitialInterests({
        nextHeaders: await headers(),
    });

    return (
        <>
            <Container>
                <OnboardingProgress step={2} />
            </Container>

            <Container>
                <OnboardingTextBlock
                    title={"Customize Your Interests"}
                    subtitle={"Pick the things you’re passionate about so we can show events that match your interests."}
                    className={styles.page__info}
                />
                <OnboardingInterestsPicker interests={data || []} />
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