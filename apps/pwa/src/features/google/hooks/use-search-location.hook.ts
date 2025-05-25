import { useFetchQuery } from "@/lib/react-query";
import { useDebounceCallback } from "@/lib/hooks";
import { SearchLocations, searchLocations } from "@/api/google/places/search";
import { useLocale } from "next-intl";

export function useSearchLocation() {
    const fetchQuery = useFetchQuery();
    const debounceCallback = useDebounceCallback();
    const locale = useLocale();

    const searchPlacesByTextQuery = (query: string) => {
        return debounceCallback(async() =>
            fetchQuery({
                queryKey: [SearchLocations.queryKey, query],
                queryFn: () => searchLocations({
                    body: {
                        textQuery: query,
                        languageCode: locale,
                    },
                    params: {
                        fieldMask: ["id", "displayName", "location", "primaryType", "primaryTypeDisplayName"],
                    },
                }).then(res => res.data || { places: [] }),
            }),
        );
    };

    return {
        searchPlacesByTextQuery,
    };
}