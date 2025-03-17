import { Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { EventProgress } from "../_components/event-progress";
import { OnboardingTextBlock } from "../../onboarding/_components";
import { headers } from "next/headers";
import { CreateEventBioForm } from "../_components/event-bio-form";
import { getUserInterests } from "@/api/interests";
import { EventInterestsPicker } from "./_components";

export default async function Page() {
    // Потім треба буде OnboardingTextBlock перенести в shared і зробити це просто textBlock


    const { data } = await getUserInterests({
        nextHeaders: await headers(),
    });

    const items = data?.userInterests.slice(0, 8)

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

            <Container>
                <EventInterestsPicker interests={items || []} />
            </Container>
        </>
    );
};