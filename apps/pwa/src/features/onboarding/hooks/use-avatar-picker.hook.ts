"use client";

import { useState } from "react";
import { useSessionStore } from "@/features/session";
import { useOnboardingStore } from "@/features/onboarding";

export function useAvatarPicker(defaultAvatars: string[]) {
    const sessionStore = useSessionStore();
    const onboardingStore = useOnboardingStore();

    const [avatars] = useState<string[]>(() => {
        if(sessionStore.user?.profile.picture) {
            return [sessionStore.user.profile.picture, ...defaultAvatars, sessionStore.user.profile.picture, ...defaultAvatars];
        }

        return defaultAvatars;
    });

    const handleSetAvatar = (index: number) => {
        onboardingStore.setPicture(avatars[index]);
    };

    return {
        avatars,
        handleSetAvatar,
    };
}