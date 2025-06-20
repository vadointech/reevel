import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetcherError } from "@/lib/fetcher/error";
import { UpdateProfile, updateProfile } from "@/api/profile";
import { useCallback } from "react";

export type UseProfileUpdateParams = Omit<UseMutationOptions<UpdateProfile.TOutput, FetcherError, UpdateProfile.TInput>, "mutationFn">;

export function useProfileUpdate(params: UseProfileUpdateParams = {}) {
    const updateUserProfileMutation = useMutation<UpdateProfile.TOutput, FetcherError, UpdateProfile.TInput>({
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