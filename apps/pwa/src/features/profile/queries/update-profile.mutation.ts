import { UpdateProfile, updateProfile } from "@/api/profile";
import { UseMutationOptions } from "@tanstack/react-query";
import { FetcherErrorResponse } from "@/lib/fetcher/types";

export const UpdateProfileMutation: UseMutationOptions<UpdateProfile.TOutput, FetcherErrorResponse, UpdateProfile.TInput> = {
    mutationFn: (input: UpdateProfile.TInput) => {
        return updateProfile({
            body: input,
        }).then(response => response.data);
    },
};