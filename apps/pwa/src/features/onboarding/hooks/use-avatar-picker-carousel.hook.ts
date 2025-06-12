"use client";

import { useEffect, useState } from "react";
import { reaction } from "mobx";
import { useSessionStore } from "@/features/session";
import { useOnboardingStore } from "@/features/onboarding";

export function useOnboardingAvatarPickerCarousel(defaultAvatars: string[]) {
    const sessionStore = useSessionStore();
    const onboardingStore = useOnboardingStore();

    const [avatars, setAvatars] = useState<string[]>(() => {
        if(sessionStore.user?.profile.picture) {
            return [sessionStore.user.profile.picture, ...defaultAvatars, sessionStore.user.profile.picture, ...defaultAvatars];
        }

        return defaultAvatars;
    });

    const [_, setReady] = useState(true);

    useEffect(() => {
        const disposer = reaction(
            () => sessionStore.user,
            (user) => {
                const picture = user?.profile.picture;
                if(picture) {
                    setAvatars([picture, ...defaultAvatars, picture, ...defaultAvatars]);
                    setReady(state => !state);
                }
            },
        );

        return () => disposer();
    }, []);

    const handleSetAvatar = (index: number) => {
        onboardingStore.setPicture(avatars[index]);
    };

    return {
        avatars,
        handleSetAvatar,
    };
}