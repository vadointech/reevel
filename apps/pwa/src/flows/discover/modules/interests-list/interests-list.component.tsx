"use client";

import { observer } from "mobx-react-lite";
import { InterestButton } from "@/components/ui";

import { useDiscoverContext } from "@/features/event/discover";

import { InterestEntity } from "@/entities/interests";
import { useEffect } from "react";

export namespace DiscoverInterestsList {
    export type Data = {
        interests: InterestEntity[]
    };
    export type Props = Data & {
        onEventInterestPick: (pointId: string | null) => void;
    };
}

export const DiscoverInterestsList = observer(({
    interests,
    onEventInterestPick,
}: DiscoverInterestsList.Props) => {
    const { filtersStore } = useDiscoverContext();

    useEffect(() => {
        return () => {
            onEventInterestPick(null);
        };
    }, []);

    return interests.map(interest => (
        <InterestButton
            key={interest.slug}
            icon={interest.icon}
            variant={
                filtersStore.locationInterest === interest.slug ? "primary" : "default"
            }
            onClick={() => onEventInterestPick(interest.slug)}
        >
            { interest.title_uk }
        </InterestButton>
    ));
});
