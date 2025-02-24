"use client";

import { InterestCard } from "@/components/shared/interest-card";

export namespace OnboardingInterestsPicker {
    export type Props = {};
}

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

export const OnboardingInterestsPicker = ({}: OnboardingInterestsPicker.Props) => {
    return (
        <>
            {
                interests.map((item, i) => (
                    <InterestCard
                        icon={item.icon}
                        text={item.name}
                        key={i}
                        selected={false}
                        onChange={() => {}}
                    />
                ))
            }
        </>
    );
};
