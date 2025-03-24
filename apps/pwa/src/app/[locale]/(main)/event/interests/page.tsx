import { Button, Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { EventProgress } from "../_components/event-progress";
import { OnboardingTextBlock } from "../../onboarding/_components";
import { CreateEventBioForm } from "../_components/event-bio-form";
import { EventInterestsPicker } from "./_components";
import { getUserInterests, searchInterests } from "@/api/interests";
import { headers } from "next/headers";
import { ArrowBack } from "@/components/icons";

export default async function Page() {
    // Потім треба буде OnboardingTextBlock перенести в shared і зробити це просто textBlock

    const { data: userInterests } = await getUserInterests({
        nextHeaders: await headers(),
    });

    const { data: interests } = await searchInterests();


    return (
        <>
            <Container>
                <EventProgress step={1} />

                <OnboardingTextBlock
                    title={"Describe Your Event"}
                    subtitle={"Think of a catchy name and provide a brief description that will excite potential attendees!"}
                    className={styles.page__textBlock}
                />
                <CreateEventBioForm />

                <EventInterestsPicker userInterests={userInterests ?? []} initialInterests={interests ?? []} />
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