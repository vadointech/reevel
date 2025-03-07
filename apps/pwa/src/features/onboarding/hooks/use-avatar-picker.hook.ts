"use client";

import { useEffect, useState } from "react";
import { useSessionStore } from "@/features/session";
import { useOnboardingStore } from "@/features/onboarding";

export function useAvatarPicker(defaultAvatars: string[]) {
    const sessionStore = useSessionStore();
    const onboardingStore = useOnboardingStore();

    const [avatars, setAvatars] = useState<string[]>(() => {
        if(sessionStore.user?.profile.picture) {
            return [sessionStore.user.profile.picture, ...defaultAvatars, sessionStore.user.profile.picture, ...defaultAvatars];
        }

        return defaultAvatars;
    });

    useEffect(() => {
        setAvatars(state => {
            const picture = sessionStore.user?.profile.picture;
            if(!picture) return state;
            if(state.includes(picture)) return state;
            return [picture, ...state];
        });
    }, [sessionStore.user?.profile.picture]);

    const handleSetAvatar = (index: number) => {
        onboardingStore.setPicture(avatars[index]);
    };

    return {
        avatars,
        handleSetAvatar,
    };
}