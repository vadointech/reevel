import { Container } from "@/components/ui";
import { Header } from "@/components/shared/header";
import { CreateEventBioForm } from "./_components/event-bio-form";
import { getUserInterests } from "@/api/interests";
import { headers } from "next/headers";
import { EventInterestsPicker, TicketsPicker } from "./interests/_components";

import styles from "./styles.module.scss"
import { OptionItem } from "@/components/shared/options";
import { IconNavigation } from "@/components/icons";
import { DatePicker } from "./_components/date-picker";
import { NextStepButton } from "./_components/next-step-button/next-step-button.component";

export default async function Home() {
    const { data: userInterests } = await getUserInterests({
        nextHeaders: await headers(),
    });

    return (
        <div className={styles.page}>
            <Container>
                <Header title="Create event" size="large" />
            </Container>
            <Container className={styles.page__wrapper}>
                <CreateEventBioForm />

                <EventInterestsPicker userInterests={userInterests ?? []} className={styles.page__wrapper__interests} />

                <OptionItem
                    label="Location"
                    description="Required"
                    icon={<IconNavigation />}
                    backIcon
                    className={styles.page__wrapper__location}
                />

                <TicketsPicker />

                <DatePicker />

                <Container className={styles.page__buttons}>
                    <NextStepButton />
                </Container>
            </Container>
        </div>
    )
}