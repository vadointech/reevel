import { useOnboardingProgress } from "@/app/[locale]/onboarding/_components";
import { useOnboardingStore } from "@/features/onboarding";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaceByCoordinates } from "@/api/mapbox/get-place-by-coordinates";
import { IMapboxProvider } from "@/components/persistent-map/providers";

export function useLocationConfirmation() {
    const { handleSetStep } = useOnboardingProgress();
    const onboardingStore = useOnboardingStore();

    useEffect(() => {
        if(!onboardingStore.location) {
            handleSetStep("/onboarding/location");
        }
    }, []);

    const { data } = useQuery({
        queryKey: ["user/city"],
        queryFn: async() => {
            if(!onboardingStore.location) return null;
            return getPlaceByCoordinates({
                lng: onboardingStore.location[0],
                lat: onboardingStore.location[0],
            }, {
                types: "place,region",
            })
                .then(({ data }) => data?.features[0]);
        },
    });

    const handleShowOnMap = (provider: IMapboxProvider) => {
        if(data) {
            if(data.place_type.includes("place")) {
                provider.fitBounds(data?.bbox, {
                    padding: {
                        bottom: 260,
                    },
                });
            }
            if(data.place_type.includes("region")) {
                provider.flyTo(data?.center, {
                    padding: {
                        bottom: 260,
                    },
                });
            }
        }
    };

    return {
        place: data,
        handleShowOnMap,
    };
}