import { Avatar, Button, Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { ProgressBar } from "@/components/shared";
import { ArrowBack } from "@/components/icons";
import { OnboardingTextBlock } from "../_components";
import { Input } from "@/components/ui/input";
import { InterestCard } from "@/components/shared/interest-card";

export default function Page() {

    const interests = [
        { name: "Спорт", img: "🥊" },
        { name: "Музика", img: "🤿" },
        { name: "Подорожі", img: "🥊" },
        { name: "Спорт", img: "🥊" },
        { name: "Спорт", img: "⛑️" },
        { name: "Музика", img: "🥊" },
        { name: "Подорожі", img: "🥊" },
        { name: "Спорт", img: "🥊" },
        { name: "Спорт", img: "🤿" },
        { name: "Музика", img: "🥊" },
        { name: "Подорожі", img: "⛑️" },
        { name: "Спорт", img: "🥊" },
        { name: "Спорт", img: "🤿" },
        { name: "Музика", img: "🥊" },
        { name: "Подорожі", img: "⛑️" },
        { name: "Спорт", img: "🥊" },
                { name: "Спорт", img: "🥊" },
        { name: "Спорт", img: "🤿" },
        { name: "Музика", img: "🥊" },
        { name: "Подорожі", img: "⛑️" },
        { name: "Спорт", img: "🥊" },
    ];

    return (
        <div className={styles.page}>
            <Container>
                <ProgressBar
                    stepCount={4}
                    currentStep={2}
                    controlLeft={<ArrowBack className={styles.controlLeft} strokeWidth={0.3} />}
                />
            </Container>
            <Container className={styles.page__info}>
                <OnboardingTextBlock
                    title={"Customize Your Interests"}
                    subtitle={"Pick the things you’re passionate about so we can show events that match your interests."}
                    className={styles.page__text}
                />
            </Container>

            <Container className={styles.page__interests}>
                {interests.map((item, i) => (
                    <InterestCard icon={item.img} text={item.name} key={i} />
                ))}
            </Container>
            <Container className={styles.page__buttons}>
                <Button
                    variant={"primary"}
                    iconAfter={<ArrowBack />}
                >
                    Next step
                </Button>
            </Container>
        </div>
    );
}