"use client";

import { observer } from "mobx-react-lite";
import { InterestButton } from "@/components/ui";

import { useDiscoverContext } from "@/features/discover";

import { InterestEntity } from "@/entities/interests";

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
    const discover = useDiscoverContext();

    return interests.map(interest => (
        <InterestButton
            key={interest.slug}
            icon={interest.icon}
            variant={
                discover.store.interestFilter === interest.slug ? "primary" : "default"
            }
            onClick={() => onEventInterestPick(interest.slug)}
        >
            { interest.title_uk }
        </InterestButton>
    ));
});
