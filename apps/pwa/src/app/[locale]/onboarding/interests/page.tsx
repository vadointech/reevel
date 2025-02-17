'use client'

import { Button, Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { ProgressBar } from "@/components/shared";
import { ArrowBack } from "@/components/icons";
import { OnboardingTextBlock } from "../_components";
import { InterestCard } from "@/components/shared/interest-card";
import { useState } from "react";

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

    const [selectedInterests, setSelectedInterests] = useState<Record<string, boolean>>({
        sport: false,
        music: false,
        travel: false,
    });

    const handleInterestChange = (interest: string, isSelected: boolean) => {
        setSelectedInterests(prev => ({
            ...prev,
            [interest]: isSelected,
        }));
    };

    return (
        <div className={styles.page}>
            <Container>
                <ProgressBar
                    stepCount={4}
                    currentStep={2}
                    invertedLeftControl={true}
                    type="close"
                />
            </Container>
            <Container className={styles.page__info}>
                <OnboardingTextBlock
                    title={"Customize Your Interests"}
                    subtitle={"Pick the things you’re passionate about so we can show events that match your interests."}
                />
            </Container>

            <Container className={styles.page__interests}>
                {interests.map((item, i) => (
                    <InterestCard
                        icon={item.icon}
                        text={item.name}
                        key={i}
                        selected={selectedInterests[item.name.toLowerCase()] || false}
                        onChange={(isSelected) => handleInterestChange(item.name.toLowerCase(), isSelected)}
                    />
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