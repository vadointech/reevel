"use client";

import { Button } from "@/components/ui";
import { useOnboardingProgress } from "@/app/[locale]/onboarding/_components";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

export const OnboardingLocationRequest = () => {
    const { handleSetStep } = useOnboardingProgress();

    const { data, error, refetch } = useQuery({
        enabled: false,
        queryKey: ["user/location"],
        queryFn: () => {
            return new Promise((resolve, reject) => {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        ({ coords }) => {
                            resolve({
                                lng: coords.longitude,
                                lat: coords.latitude,
                            });
                        },
                        (error) => {
                            reject(new Error(error.message)); // Коректна обробка помилки
                        },
                    );
                } else {
                    reject(new Error("Geolocation is not supported by this browser."));
                }
            });
        },
    });

    useEffect(() => {
        if(data) handleSetStep("/onboarding/location/confirm");
    }, [data]);

    useEffect(() => {
        // if(error) TODO: Show modal "We're unable to get your location. (Enter it manually)"
    }, [error]);

    const handleRequestLocation = useCallback(() => {
        refetch();
    }, []);

    return (
        <Button
            variant={"primary"}
            onClick={handleRequestLocation}
        >
            Allow Location Access
        </Button>
    );
};