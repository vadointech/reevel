"use client";

import { ComponentProps, useState } from "react";
import { InterestCard } from "@/components/shared/interest-card";

export namespace InterestsSection {
    export type Props = ComponentProps<"div"> & {
        interests: { name: string; icon: string }[];
    };
}

export const InterestsSection = ({ interests }: InterestsSection.Props) => {

    // Це поки просто затичка, щоб можна було вибирати елементи, зараз вибираються всі елементи які мають однаковий тип
    // Я так розумію що потім кожен інтерес буде унікальним і не буде проблеми що зразу декілька вибрано

    const [selectedInterests, setSelectedInterests] = useState<Record<string, boolean>>({
        sport: false,
        music: true,
        travel: false,
    });

    const handleInterestChange = (interest: string, isSelected: boolean) => {
        setSelectedInterests(prev => ({
            ...prev,
            [interest]: isSelected,
        }));
    };

    return (
        <>
            {interests.map((item, i) => (
                <InterestCard
                    icon={item.icon}
                    text={item.name}
                    key={i}
                    selected={selectedInterests[item.name.toLowerCase()] || false}
                    onChange={(isSelected) => handleInterestChange(item.name.toLowerCase(), isSelected)}
                />
            ))}
        </>
    );
};
