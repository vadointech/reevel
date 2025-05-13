import { Container } from "@/components/ui";
import { Header } from "@/components/shared/header";
import { CreateEventBioForm } from "./_components/event-bio-form";
import { getUserInterests, searchInterests } from "@/api/interests";
import { headers } from "next/headers";

import styles from "./styles.module.scss"
import { OptionItem } from "@/components/shared/options";
import { IconNavigation } from "@/components/icons";
import { DatePicker } from "./_components/date-picker";
import { NextStepButton } from "./_components/next-step-button/next-step-button.component";
import { EventInterestsPicker } from "./_components/interests-picker";
import { TicketsPicker } from "./_components/tickets-picker";

export default async function Home() {
    const { data: userInterests } = await getUserInterests({
        nextHeaders: await headers(),
    });

    const { data: initialInterests } = await searchInterests();


    return (
        <div className={styles.page}>
            <Container>
                <Header title="Create event" size="large" />
            </Container>
            <Container className={styles.page__wrapper}>
                <CreateEventBioForm />

                <EventInterestsPicker userInterests={userInterests ?? []} initialInterests={initialInterests ?? []} className={styles.page__wrapper__interests} />

                <OptionItem
                    label="Location"
                    description="Required"
                    icon={<IconNavigation width={22} height={22} />}
                    backIcon
                    className={styles.page__wrapper__location}
                />

                <TicketsPicker />

                <DatePicker />

                <div className={styles.page__buttons}>
                    <NextStepButton />
                </div>
            </Container>
        </div>
    )
}