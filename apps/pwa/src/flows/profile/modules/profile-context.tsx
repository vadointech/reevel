// profile-context.tsx
"use client";

import { UserProfileEntity } from "@/entities/profile";
import { createContext, useContext } from "react";


export const ProfileContext = createContext<UserProfileEntity | null>(null);

export function useProfile() {
    return useContext(ProfileContext);
}

export function ProfileProvider({
    user,
    children,
}: {
    user: UserProfileEntity | null;
    children: React.ReactNode;
}) {
    return (
        <ProfileContext.Provider value={user}>
            {children}
        </ProfileContext.Provider>
    );
}
