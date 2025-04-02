import { Button, Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { EventProgress } from "../_components/event-progress";
import { OnboardingTextBlock } from "../../onboarding/_components";
import { ArrowBack } from "@/components/icons";
import { Poster } from "../_components/poster";
import { PostersSection } from "./_components/posters-section";
import { OnboardingPhotoUploader } from "../../onboarding/photo/_components";


export default async function Page() {



    return (
        <>
            <Container>
                <EventProgress step={2} />

                <OnboardingTextBlock
                    title={"Show Off Your Event!"}
                    subtitle={"Choose or upload a poster that perfectly represents your event."}
                    className={styles.page__textBlock}
                />
            </Container>

            <Container className={styles.page__content}>
                <PostersSection>
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                    <Poster size="default" />
                </PostersSection>
            </Container>
            <Container className={styles.page__buttons}>
                <Button
                    variant="primary"
                    iconAfter={<ArrowBack />}
                >
                    Next step
                </Button>
            </Container>
        </>
    );
};