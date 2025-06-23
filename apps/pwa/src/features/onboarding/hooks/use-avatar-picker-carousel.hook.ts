"use client";

import { useEffect, useState } from "react";
import { reaction } from "mobx";
import { useSessionContext } from "@/features/session";
import { useOnboardingFormContext } from "@/features/onboarding";

export function useOnboardingAvatarPickerCarousel(defaultAvatars: string[]) {
    const session = useSessionContext();
    const form = useOnboardingFormContext();

    const [avatars, setAvatars] = useState<string[]>(() => {
        if(session.store.user?.profile.picture) {
            return [session.store.user.profile.picture, ...defaultAvatars, session.store.user.profile.picture, ...defaultAvatars];
        }

        return defaultAvatars;
    });

    useEffect(() => {
        const disposer = reaction(
            () => session.store.user,
            (user) => {
                const picture = user?.profile.picture;
                if(picture) {
                    setAvatars([picture, ...defaultAvatars, picture, ...defaultAvatars]);
                }
            },
        );

        return () => disposer();
    }, []);

    const handleSetAvatar = (index: number) => {
        form.setValue("picture", avatars[index]);
    };

    return {
        avatars,
        handleSetAvatar,
    };
}