import { useCallback, useEffect, useRef } from "react";
import { GetLocationByNameQueryBuilder } from "@/features/location/search/queries";
import { reaction } from "mobx";
import { RequestDebouncer } from "@/lib/debouncer";
import { useQueryClient } from "@tanstack/react-query";
import { useLocationSearchContext } from "@/features/location/search";
import { usePersistentMap } from "@/components/shared/map";
import { PlaceLocationEntity } from "@/entities/place";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export function useLocationSearch(resultsInit: PlaceLocationEntity[] = []) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const map = usePersistentMap();
    const { store, config } = useLocationSearchContext();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const debouncer = useRef(new RequestDebouncer());

    useEffect(() => {
        queryClient.setQueryData(
            GetLocationByNameQueryBuilder.queryKey(),
            resultsInit,
        );
    }, []);

    const handleFetchData = useCallback((input: GetLocationByNameQueryBuilder.TInput) => {
        return debouncer.current.debounceRequest(async() => {
            if (input.name.length > 2) {
                return queryClient.fetchQuery(GetLocationByNameQueryBuilder(input));
            } else {
                return undefined;
            }
        }, 700);
    }, [queryClient]);

    const setSearchResults = (response?: PlaceLocationEntity[]) => {
        if(!response) {
            store.setSearchResults(null);
            return;
        }

        store.setSearchResults(response);
    };

    useEffect(() => {
        const disposer = reaction(
            () => store.searchQuery,
            (query) => handleFetchData({
                name: query,
                country: "ua",
                language: "uk",
                types: "place",
                accessToken: map.provider.current.internalConfig.accessToken,
            }).then(setSearchResults),
        );

        return () => disposer();
    }, []);

    const handleLocationSelect = useCallback((place: PlaceLocationEntity) => {
        const params = new URLSearchParams();
        params.set(config.confirmationParam, place.id);
        router.push(config.confirmUrl + "?" + params.toString());
    }, []);

    const containerRef = useCallback((element: HTMLElement | null) => {
        if(!element) return;

        const list = element.firstElementChild;
        if(!list) return;
        if(list.childNodes.length === 0) return;

        const prevPlaceId = searchParams.get(config.confirmationParam);
        if(!prevPlaceId) return;


        const containerHeight = element.clientHeight;

        for(const [index, child] of list.childNodes.entries()) {
            const childNode = child instanceof HTMLElement ? child : null;
            if(!childNode) continue;

            const scrollPosition = index * childNode.clientHeight;

            const childLocation = childNode.dataset.location;

            if(childLocation && childLocation === prevPlaceId) {
                if(scrollPosition >= containerHeight) {
                    requestAnimationFrame(() => {
                        element.scrollTo({
                            top: scrollPosition,
                            behavior: "smooth",
                        });
                    });
                }
            }
        }

        router.replace(pathname);
    }, []);

    return {
        containerRef,
        handleLocationSelect,
    };
}