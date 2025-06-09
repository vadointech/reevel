import { useCallback, useEffect, useRef } from "react";
import { reaction } from "mobx";
import { useInterestsPickerContext } from "../interests-picker.context";
import { InterestEntity } from "@/entities/interests";
import { RequestDebouncer } from "@/lib/debouncer";
import { useQueryClient } from "@tanstack/react-query";
import { SearchInterestsQueryBuilder } from "@/features/interests/picker/queries";
import { GetInterestsByTitle } from "@/api/interests";

export function useInterestsSearch() {
    const queryClient = useQueryClient();
    const { store, controller } = useInterestsPickerContext();

    const debouncer = useRef(new RequestDebouncer());

    const interestsSnapshot = useRef<InterestEntity[]>(store.interests);

    const handleFetchData = useCallback((query: string, forceRefresh: boolean = false) => {
        return debouncer.current.debounceRequest(async() => {
            if(query.length > 1) {
                if(!forceRefresh) {
                    if(store.interests.length > 0) {
                        interestsSnapshot.current = store.interests;
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
                    ...store.selectedInterests,
                ];
            }
        }, 700);
    }, []);

    const setSearchResults = (response: GetInterestsByTitle.TOutput) => {
        controller.setInterests(response);
    };
    const appendSearchResults = (response: GetInterestsByTitle.TOutput) => {
        controller.appendInterests(response);
    };

    useEffect(() => {
        const disposer = reaction(
            () => store.searchTerm,
            (query) => handleFetchData(query).then(setSearchResults),
        );
          
        return () => disposer();
    }, [store, handleFetchData]);


    const handleLoadMore = useCallback(() => {
        handleFetchData(store.searchTerm, true).then(appendSearchResults);
    }, [handleFetchData]);

    return {
        handleLoadMore,
    };
}