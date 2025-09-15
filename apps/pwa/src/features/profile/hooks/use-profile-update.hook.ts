import { useCallback } from "react";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UpdateProfile } from "@/api/profile";
import { FetcherErrorResponse } from "@/lib/fetcher/types";
import { updateProfileAction } from "../actions";

export type UseProfileUpdateParams = Omit<UseMutationOptions<UpdateProfile.TOutput, FetcherErrorResponse, UpdateProfile.TInput>, "mutationFn">;

export function useProfileUpdate(params: UseProfileUpdateParams = {}) {
    const updateUserProfileMutation = useMutation<UpdateProfile.TOutput, FetcherErrorResponse, UpdateProfile.TInput>({
        mutationFn: updateProfileAction,
        ...params,
    });

    const handleUpdateProfile = useCallback((data: UpdateProfile.TInput) => {
        return updateUserProfileMutation.mutateAsync(data);
    }, []);

    return {
        handleUpdateProfile,
    };
}