import { useLocationAccess, useLocationPickerStore } from "@/features/location/picker";
import { useRouter } from "@/i18n/routing";
import { usePersistentMap } from "@/components/shared/map/map.context";
import { useFetchQuery } from "@/lib/react-query";
import { getPlaceByCoordinates, GetPlaceByCoordinates } from "@/api/mapbox/get-place-by-coordinates";
import { useLocale } from "next-intl";

export function useLocationPicker() {
    const locationPickerStore = useLocationPickerStore();
    const router = useRouter();
    const { provider } = usePersistentMap();
    const locale = useLocale();

    const fetchPlaceByCoordinates = useFetchQuery();

    const { handleRequestLocation } = useLocationAccess({
        onSuccess: async(location) => {
            locationPickerStore.setLocation([location.longitude, location.latitude]);
            // router.push(locationPickerStore.config.confirmationUrl);

            const response = await fetchPlaceByCoordinates({
                queryKey: [GetPlaceByCoordinates.queryKey, location.longitude, location.latitude],
                queryFn: () => getPlaceByCoordinates({
                    body: {
                        lng: location.longitude,
                        lat: location.latitude,
                    },
                    params: {
                        access_token: provider?.accessToken,
                        types: "address",
                        language: locale,
                    },
                }).then(({ data }) => data?.features[0]),
            });
        },
    });

    const handlePickLocation = (location: [number, number]) => {
        locationPickerStore.setLocation(location);
    };

    return {
        handleRequestLocation,
        handlePickLocation,
    };
}