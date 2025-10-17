"use client";

import { useRef } from "react";
import { InterestEntity } from "@/entities/interests";
import { useQueryClient } from "@tanstack/react-query";
import { useInterestsPickerContext } from "../interests-picker.context";
import { RequestDebouncer } from "@/lib/debouncer";
import { GetRelatedInterestsQueryBuilder } from "../queries";
import { GetRelatedInterests } from "@/api/interests";

export function useRelatedInterests() {
    const { controller, store } = useInterestsPickerContext();
    const debouncer = useRef(new RequestDebouncer());
    const queryClient = useQueryClient();

    function isExist(related: InterestEntity | InterestEntity[]) {
        if(Array.isArray(related)) {
            return store.interests.some(item =>
                related.every(r => item.slug === r.slug),
            );
        } else {
            return store.interests.some(interest =>
                interest.slug === interest.slug,
            );
        }
    }

    function insertInterestsAfter(key: string, interests: InterestEntity[]): InterestEntity[] | undefined {
        if (!key || !interests?.length) {
            return;
        }

        const targetIndex = store.interests.findIndex((item) => item.slug === key);
        if (targetIndex === -1) {
            return;
        }

        controller.insertInterestsAt(targetIndex, interests);
    }

    function removeRelated(key: string) {
        const queryKey = GetRelatedInterestsQueryBuilder.queryKey([key]);

        const related = queryClient.getQueryData(queryKey) as GetRelatedInterests.TOutput;
        if (!related) return;

        const selected = related.some(item => controller.isInterestSelected(item.slug));
        if(selected) return;

        controller.removeInterestsBy((item) => {
            return !related.some(interest => interest.slug === item.slug);
        });
    }

    async function getRelated(key: string) {
        const interests = await debouncer.current.debounceRequest(() =>
            queryClient.fetchQuery(
                GetRelatedInterestsQueryBuilder({ slug: key }),
            ),
        );
        insertInterestsAfter(key, interests);
        return interests;
    }

    return {
        isExist,
        getRelated,
        removeRelated,
    };
}