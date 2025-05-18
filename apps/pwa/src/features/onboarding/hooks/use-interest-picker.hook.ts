"use client";

import { useOnboardingStore } from "@/features/onboarding/stores/onboarding.store";
import { startTransition, useRef, useState } from "react";
import { GetRelatedInterests, getRelatedInterests } from "@/api/interests/get-related";
import { useMutation } from "@tanstack/react-query";

export function useInterestPicker(interestsInit: GetRelatedInterests.TOutput) {
    const onboardingStore = useOnboardingStore();

    const [interests, setInterests] = useState(interestsInit);
    const relatedElRef = useRef<Record<string, GetRelatedInterests.TOutput>>({});

    const updateInterests = (related: GetRelatedInterests.TOutput, slug: string) => {
        startTransition(() => {
            setInterests(state => {
                const index = state.findIndex((item) => item.slug === slug);
                if (index === -1) return state;

                const newState = [...state];
                newState.splice(index + 1, 0, ...related);
                return newState;
            });
        });
    };

    const { mutate } = useMutation({
        mutationFn: async(input: GetRelatedInterests.TInput) => {
            const response = await getRelatedInterests({
                body: input,
            }).then(res => res.data || []);
            return response.filter(item => !interests.some(interest => interest.slug === item.slug));
        },
        onSuccess: (response, { slug }) => {
            const related = relatedElRef.current[slug] = response;
            updateInterests(related, slug);
        },
    });

    const handlePickInterest = (slug: string) => {
        const isInterestSelected = onboardingStore.interests.includes(slug);
        const related = relatedElRef.current[slug];

        if (isInterestSelected) {
            onboardingStore.removeInterest(slug);
            if (!related) return;
            startTransition(() => {
                setInterests(state => {
                    return state.filter(item => !related.some(interest => interest.slug === item.slug));
                });
            });
        } else {
            onboardingStore.addInterest(slug);
            if (!related) {
                mutate({ slug });
            } else {
                updateInterests(related, slug);
            }
        }
    };

    return {
        interests,
        handlePickInterest,
    };
}