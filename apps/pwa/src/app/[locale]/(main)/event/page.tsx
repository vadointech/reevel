import { Container } from "@/components/ui";
import { Header } from "@/components/shared/header";
import { CreateEventBioForm } from "./_components/event-bio-form";
import { getUserInterests, searchInterests } from "@/api/interests";
import { headers } from "next/headers";
import { EventInterestsPicker, TicketsPicker } from "./interests/_components";

import styles from "./styles.module.scss"
import { OptionItem } from "@/components/shared/options";
import { IconApple, IconNavigation } from "@/components/icons";



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
            </Container>
        </div>
    )
}