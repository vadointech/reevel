import { Button, Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { EventProgress } from "../_components/event-progress";
import { OnboardingTextBlock } from "../../onboarding/_components";
import { ArrowBack } from "@/components/icons";
import { Toggle } from "@/components/ui/toggle";
import { EventDatePicker, EventMonthPicker } from "./_components";

export default async function Page() {



    return (
        <>
            <Container>
                <EventProgress step={2} />

                <OnboardingTextBlock
                    title={"When’s the Big Day?"}
                    subtitle={"Select a specific date and time to help attendees plan ahead for your event."}
                    className={styles.page__textBlock}
                />

                <Toggle time="11:40" date="October 1" className={styles.page__toggle} />

                <div className={styles.page__carousels}>
                    <EventMonthPicker defaultAvatars={['test', 'test']} />
                    <EventDatePicker defaultAvatars={['test', 'test']} />
                </div>

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