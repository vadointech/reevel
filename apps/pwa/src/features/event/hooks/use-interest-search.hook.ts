"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { InterestEntity } from "@/entities/interests";
import { useEventStore } from "../stores/event-create.store";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/lib/hooks";
import { searchInterests } from "@/api/interests";

export function useInterestSearch(initialInterests: InterestEntity[]) {
    const eventStore = useEventStore();
    const [searchValue, setSearchValue] = useState("");

    const debounceSearchValue = useDebounce(searchValue, 300);

    const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const { data: searchResults } = useQuery({
        queryKey: ["interests", debounceSearchValue],
        initialData: initialInterests,
        queryFn: async () => {
            if (!debounceSearchValue.trim()) {
                return initialInterests;
            }
            const response = await searchInterests({ params: { s: debounceSearchValue } });
            return response.data;
        },
        enabled: true
    });

    const handlePickInterest = (interest: InterestEntity) => {
        const isSelected = eventStore.interests.some((item) => item.slug === interest.slug);
        if (isSelected) {
            eventStore.removeInterest(interest);
        } else {
            eventStore.addInterest(interest);
        }
    };

    return {
        interests: searchResults,
        searchValue,
        handlePickInterest,
        onSearchValueChange,
    };
}