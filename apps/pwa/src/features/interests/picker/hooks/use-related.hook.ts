"use client";

import { InterestEntity } from "@/entities/interests";
import { useQueryClient } from "@tanstack/react-query";
import { getRelatedInterests, GetRelatedInterests } from "@/api/interests";
import { useInterestsPickerStore } from "../interests-picker.store";
import { useFetchQuery } from "@/lib/react-query";

export function useRelatedInterests() {
    const interestsPickerStore = useInterestsPickerStore();
    const fetchRelatedInterests = useFetchQuery();
    const queryClient = useQueryClient();

    function isExist(related: InterestEntity | InterestEntity[]) {
        if(Array.isArray(related)) {
            return interestsPickerStore.interests.some(item =>
                related.every(r => item.slug === r.slug),
            );
        } else {
            return interestsPickerStore.interests.some(interest =>
                interest.slug === interest.slug,
            );
        }
    }

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

    async function getRelated(key: string) {
        const response = await fetchRelatedInterests({
            queryKey: [...GetRelatedInterests.queryKey, key],
            queryFn: () => getRelatedInterests({ body: { slug: key } })
                .then(res => res.data || []),
        });
        insertInterestsAfter(key, response);
        return response;
    }

    return {
        isExist,
        getRelated,
        removeRelated,
    };
}