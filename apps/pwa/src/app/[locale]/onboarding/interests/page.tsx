import { Button, Container } from "@/components/ui";

import { ProgressBar } from "@/components/shared";
import { ArrowBack } from "@/components/icons";
import { OnboardingTextBlock } from "../_components";
import { InterestsSection } from "../_components/interests-section";

import styles from "./styles.module.scss";

export default function Page() {

    const interests = [
        { name: "Sport", icon: "🥊" },
        { name: "Music", icon: "🤿" },
        { name: "Travel", icon: "🥊" },
        { name: "Sport", icon: "🥊" },
        { name: "Sport", icon: "⛑️" },
        { name: "Music", icon: "🥊" },
        { name: "Travel", icon: "🥊" },
        { name: "Sport", icon: "🥊" },
        { name: "Sport", icon: "🤿" },
        { name: "Music", icon: "🥊" },
        { name: "Sport", icon: "🥊" },
        { name: "Sport", icon: "🤿" },
        { name: "Music", icon: "🥊" },
        { name: "Travel", icon: "⛑️" },
        { name: "Travel", icon: "⛑️" },
        { name: "Sport", icon: "🥊" },
        { name: "Sport", icon: "🥊" },
        { name: "Sport", icon: "🤿" },
        { name: "Music", icon: "🥊" },
        { name: "Travel", icon: "⛑️" },
        { name: "Sport", icon: "🥊" },
    ];

    return (
        <>
            <Container>
                <div className={styles.page__info}>
                    <OnboardingTextBlock
                        title={"Customize Your Interests"}
                        subtitle={"Pick the things you’re passionate about so we can show events that match your interests."}
                    />
                </div>

                <div className={styles.page__interests}>
                    <InterestsSection interests={interests} />
                </div>
            </Container>

            <Container className={styles.page__buttons}>
                <Button
                    variant={"primary"}
                    iconAfter={<ArrowBack />}
                >
                    Next step
                </Button>
            </Container>
        </>
    );
}