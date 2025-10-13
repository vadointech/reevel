"use server";

import { getAccessToken } from "@/api/server";

import * as UploadProfileAvatar from "./upload-avatar";
import * as UpdateProfile from "./update-profile";

export async function uploadProfileAvatar(input: UploadProfileAvatar.UploadProfileAvatar.TInput) {
    const accessToken = await getAccessToken();
  
    const response = await UploadProfileAvatar.uploadProfileAvatar({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
    });

    if(response.data) {
        return response.data[0];
    }

    return null;
}

export async function updateProfile(input: UpdateProfile.UpdateProfile.TInput) {
    const accessToken = await getAccessToken();

    const response = await UpdateProfile.updateProfile({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
    });

    return response.data;
}