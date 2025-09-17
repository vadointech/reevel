"use server";

import { deleteAccessToken } from "@/api/server";
import { updateProfile } from "@/api/profile/server";
import { UpdateProfile } from "@/api/profile";

export async function updateProfileAction(input: UpdateProfile.TInput) {
    const profile = await updateProfile(input);

    if(profile?.completed === -1) {
        await deleteAccessToken();
    }

    return profile;
}