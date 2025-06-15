"use client";

import { useEffect, useState } from "react";
import { reaction } from "mobx";
import { useSessionContext } from "@/features/session";
import { useOnboardingStore } from "@/features/onboarding";

export function useOnboardingAvatarPickerCarousel(defaultAvatars: string[]) {
    const session = useSessionContext();
    const onboardingStore = useOnboardingStore();

    const [avatars, setAvatars] = useState<string[]>(() => {
        if(session.store.user?.profile.picture) {
            return [session.store.user.profile.picture, ...defaultAvatars, session.store.user.profile.picture, ...defaultAvatars];
        }

        return defaultAvatars;
    });

    const [_, setReady] = useState(true);

    useEffect(() => {
        const disposer = reaction(
            () => session.store.user,
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