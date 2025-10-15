"use client";

import { observer } from "mobx-react-lite";
import { InterestButton, InterestButtonSkeleton } from "@/components/ui";

import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "@/features/session";
import { GetUserInterestsQuery } from "@/features/interests/queries";
import { useDiscoverContext } from "@/features/discover";

import { InterestEntity } from "@/entities/interests";

export namespace DiscoverInterestsList {
    export type Data = {
        interestsInit: InterestEntity[]
    };
    export type Props = Data & {
        onEventInterestPick: (pointId: string | null) => void;
    };
}

export const DiscoverInterestsList = observer(({
    interestsInit,
    onEventInterestPick,
}: DiscoverInterestsList.Props) => {
    const discover = useDiscoverContext();
    const session = useSessionContext();

    const { data: interests, isFetching } = useQuery({
        enabled: session.store.authenticated,
        placeholderData: interestsInit,
        ...GetUserInterestsQuery(),
    });

    const isLoading = isFetching || session.store.loading;

    if(isLoading) {
        return [...new Array(3).keys()].map((item) => (
            <InterestButtonSkeleton key={`interest-button-skeleton-${item}`} />
        ));
    }

    return interests?.map(interest => (
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
