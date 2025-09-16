import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { DeleteUploadedFile } from "@/api/user/uploads";
import { useCallback } from "react";
import { UserUploadsEntity } from "@/entities/uploads";
import { FetcherErrorResponse } from "@/lib/fetcher/types";
import { deleteUploadedFile } from "@/api/user/uploads/server";

type ConfigParams = Omit<UseMutationOptions<DeleteUploadedFile.TOutput, FetcherErrorResponse, DeleteUploadedFile.TInput>, "mutationFn">;

export function useUploadedFileDelete(params: ConfigParams = {}) {
    const deleteUploadedFileMutation = useMutation<DeleteUploadedFile.TOutput, FetcherErrorResponse, DeleteUploadedFile.TInput>({
        mutationFn: deleteUploadedFile,
        ...params,
    });

    return useCallback((upload: UserUploadsEntity) => {
        deleteUploadedFileMutation.mutateAsync({ fileId: upload.id });
    }, []);
}