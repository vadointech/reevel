import { Button, Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { EventProgress } from "../_components/event-progress";
import { OnboardingTextBlock } from "../../onboarding/_components";
import { ArrowBack } from "@/components/icons";
import { Poster } from "../_components/poster";
import { LeftColumn, PostersSection, RightColumn } from "./_components/posters-section";
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
            {/* <OnboardingPhotoUploader /> */}

            <Container>
                <PostersSection>
                    <LeftColumn>
                        <Poster size="default" />
                        <Poster size="small" />
                        <Poster size="default" />
                        <Poster size="default" />

                        <Poster size="default" />


                    </LeftColumn>
                    <RightColumn>
                        <Poster size="default" />
                        <Poster size="default" />
                        <Poster size="default" />

                        <Poster size="default" />

                        <Poster size="default" />
                    </RightColumn>
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