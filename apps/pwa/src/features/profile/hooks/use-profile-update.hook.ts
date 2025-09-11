import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UpdateProfile, updateProfile } from "@/api/profile";
import { useCallback } from "react";
import { FetcherErrorResponse } from "@/lib/fetcher/types";

export type UseProfileUpdateParams = Omit<UseMutationOptions<UpdateProfile.TOutput, FetcherErrorResponse, UpdateProfile.TInput>, "mutationFn">;

export function useProfileUpdate(params: UseProfileUpdateParams = {}) {
    const updateUserProfileMutation = useMutation<UpdateProfile.TOutput, FetcherErrorResponse, UpdateProfile.TInput>({
        mutationFn: (body) => updateProfile({ body })
            .then(response => response.data),
        ...params,
    });

    const handleUpdateProfile = useCallback((data: UpdateProfile.TInput) => {
        return updateUserProfileMutation.mutateAsync(data);
    }, []);

    return {
        handleUpdateProfile,
    };
}