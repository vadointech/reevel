import { useCallback, useEffect, useRef } from "react";
import { reaction } from "mobx";
import { useInterestsPickerStore } from "../interests-picker.store";
import { InterestEntity } from "@/entities/interests";
import { RequestDebouncer } from "@/lib/debouncer";
import { useQueryClient } from "@tanstack/react-query";
import { SearchInterestsQueryBuilder } from "@/features/interests/picker/queries";
import { GetInterestsByTitle } from "@/api/interests";

export function useInterestsSearch() {
    const queryClient = useQueryClient();
    const interestsPickerStore = useInterestsPickerStore();

    const debouncer = useRef(new RequestDebouncer());

    const interestsSnapshot = useRef<InterestEntity[]>(interestsPickerStore.interests);

    const handleFetchData = useCallback((query: string, forceRefresh: boolean = false) => {
        return debouncer.current.debounceRequest(async() => {
            if(query.length > 1) {
                if(!forceRefresh) {
                    if(interestsPickerStore.interests.length > 0) {
                        interestsSnapshot.current = interestsPickerStore.interests;
                    }
                    const localResults = interestsSnapshot.current.filter(item => item.title_en.toLowerCase().includes(query.toLowerCase()));
                    if(localResults.length > 0) return localResults;
                }

                return queryClient.fetchQuery(
                    SearchInterestsQueryBuilder({ query }),
                );
            } else {
                return [
                    ...interestsSnapshot.current,
                    ...interestsPickerStore.selectedInterests,
                ];
            }
        }, 700);
    }, []);

    const setSearchResults = (response: GetInterestsByTitle.TOutput) => {
        interestsPickerStore.setInterests(response);
    };
    const appendSearchResults = (response: GetInterestsByTitle.TOutput) => {
        interestsPickerStore.appendInterests(response);
    };

    useEffect(() => {
        const disposer = reaction(
            () => interestsPickerStore.searchTerm,
            (query) => handleFetchData(query).then(setSearchResults),
        );
          
        return () => disposer();
    }, [interestsPickerStore, handleFetchData]);


    const handleLoadMore = useCallback(() => {
        handleFetchData(interestsPickerStore.searchTerm, true).then(appendSearchResults);
    }, [handleFetchData]);

    return {
        handleLoadMore,
    };
}