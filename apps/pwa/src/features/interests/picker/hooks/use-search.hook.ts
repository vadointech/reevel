import { ChangeEvent, useEffect, useRef } from "react";
import { useInterestsPickerStore } from "../interests-picker.store";
import { useDebounce } from "@/lib/hooks";
import { GetInterestsByTitle, getInterestsByTitle } from "@/api/interests";
import { InterestEntity } from "@/entities/interests";
import { useFetchQuery } from "@/lib/react-query";

export function useInterestsSearch() {
    const interestsPickerStore = useInterestsPickerStore();
    const fetchInterests = useFetchQuery();
    const debounceSearchValue = useDebounce(interestsPickerStore.searchTerm);

    const interestsSnapshot = useRef<InterestEntity[]>(interestsPickerStore.interests);

    useEffect(() => {
        if(debounceSearchValue.length > 0) {
            interestsSnapshot.current = interestsPickerStore.interests;
            fetchInterests({
                queryKey: [...GetInterestsByTitle.queryKey, debounceSearchValue],
                queryFn: () => getInterestsByTitle({ params: { title_en: debounceSearchValue } })
                    .then(res => res.data || []),
            }).then(res => {
                interestsPickerStore.setInterests(res);
            });
        } else {
            interestsPickerStore.setInterests([
                ...interestsSnapshot.current,
                ...interestsPickerStore.selectedInterests,
            ]);
        }
    }, [debounceSearchValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        interestsPickerStore.setSearchTerm(e.target.value);
    };

    return {
        searchTerm: interestsPickerStore.searchTerm,
        handleChange,
    };
}