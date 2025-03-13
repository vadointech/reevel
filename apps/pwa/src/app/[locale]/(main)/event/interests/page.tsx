"use client";

import { ArrowBack } from "@/components/icons";
import { Avatar, Container } from "@/components/ui";
import { useOnboardingStore } from "@/features/onboarding/stores/onboarding.store";

import styles from "./styles.module.scss";
import { EventProgress } from "../_components/event-progress";
import { OnboardingTextBlock } from "../../onboarding/_components";
import { CreateEventBioForm } from "../_components/event-bio-form";

export default function Page() {
    // Потім треба буде OnboardingTextBlock перенести в shared
    return (
        <>
            <Container>
                <EventProgress step={1} />
            </Container>

            <Container>
                <OnboardingTextBlock
                    title={"Describe Your Event"}
                    subtitle={"Think of a catchy name and provide a brief description that will excite potential attendees!"}
                    className={styles.page__textBlock}
                />
                <CreateEventBioForm />
            </Container>
        </>
    );
};