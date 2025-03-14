import { IconPlus } from "@/components/icons";
import { Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { EventProgress } from "../_components/event-progress";
import { OnboardingTextBlock } from "../../onboarding/_components";
import { TabButton } from "@/components/ui/tab-button";
import { getInitialInterests } from "@/api/interests";
import { headers } from "next/headers";
import { CreateEventBioForm } from "../_components/event-bio-form";
import { InterestsSection } from "@/components/shared/interests-section";
import { RecommendationDrawer } from "@/components/drawers/recommendation-drawer";

export default async function Page() {
    // Потім треба буде OnboardingTextBlock перенести в shared

    const { data } = await getInitialInterests({
        nextHeaders: await headers(),
    });

    const items = data?.slice(0, 8)

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
                <InterestsSection title="Interests">
                    {items?.map((item) => (
                        <TabButton key={item.slug} name={item.title_uk} icon={item.icon} />
                    ))}
                    <TabButton name="More" icon={<IconPlus width={10} height={10} strokeWidth={1.5} />} />
                </InterestsSection>
            </Container>
            <RecommendationDrawer open={true} />
        </>
    );
};