import { StartDrawer } from "@/components/drawers/start-drawer";
import { Container } from "@/components/ui";
import { OnboardingTextBlock } from "../onboarding/_components";
import { Header } from "@/components/shared/header";
import { IconApple } from "@/components/icons";
import { CreateEventBioForm } from "./_components/event-bio-form";
import { Section } from "@/components/shared/section";
import { getUserInterests, searchInterests } from "@/api/interests";
import { headers } from "next/headers";
import { EventInterestsPicker } from "./interests/_components";




export default async function Home() {

    const { data: userInterests } = await getUserInterests({
        nextHeaders: await headers(),
    });

    const { data: interests } = await searchInterests();

    return (
        <Container>
            <Header title="Create event" size="large" />

            <CreateEventBioForm />

            <EventInterestsPicker userInterests={userInterests ?? []} initialInterests={interests ?? []} />
        </Container>
    )
}