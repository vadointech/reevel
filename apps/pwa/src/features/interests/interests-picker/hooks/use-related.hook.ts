"use client";

import { InterestEntity } from "@/entities/interests";
import { useQueryClient } from "@tanstack/react-query";
import { getRelatedInterests, GetRelatedInterests } from "@/api/interests";
import { useInterestsPickerStore } from "../interests-picker.store";
import { useFetchQuery } from "@/lib/react-query";

type Callbacks = {
    onSettled: (key: string, related: InterestEntity[]) => void;
};

export function useRelatedInterests(callbacks: Partial<Callbacks> = {}) {
    const interestsPickerStore = useInterestsPickerStore();
    const fetchRelatedInterests = useFetchQuery();
    const queryClient = useQueryClient();

    function insertInterestsAfter(key: string, interests: InterestEntity[]): InterestEntity[] | undefined {
        if (!key || !interests?.length) {
            return;
        }

        const targetIndex = interestsPickerStore.interests.findIndex((item) => item.slug === key);
        if (targetIndex === -1) {
            return;
        }

        interestsPickerStore.insertInterestsAt(targetIndex, interests);
    }

    function removeRelated(key: string) {
        const queryKey = [...GetRelatedInterests.queryKey, key];

        const related = queryClient.getQueryData(queryKey) as GetRelatedInterests.TOutput;
        if (!related) return;

        const selected = related.some(item => interestsPickerStore.isInterestSelected(item.slug));
        if(selected) return;

        interestsPickerStore.removeInterestsBy((item) => {
            return !related.some(interest => interest.slug === item.slug);
        });
    }

    const getRelated = async(key: string) => {
        const response = await fetchRelatedInterests({
            queryKey: [...GetRelatedInterests.queryKey, key],
            queryFn: () => getRelatedInterests({ body: { slug: key } })
                .then(res => res.data || []),
        });
        insertInterestsAfter(key, response);
        callbacks.onSettled?.(key, response);
    };

    return {
        getRelated,
        removeRelated,
    };
}