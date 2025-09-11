import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { deleteUploadedFile, DeleteUploadedFile } from "@/api/user/uploads";
import { useCallback } from "react";
import { UserUploadsEntity } from "@/entities/uploads";
import { FetcherErrorResponse } from "@/lib/fetcher/types";

type ConfigParams = Omit<UseMutationOptions<DeleteUploadedFile.TOutput, FetcherErrorResponse, DeleteUploadedFile.TInput>, "mutationFn">;

export function useUploadedFileDelete(params: ConfigParams = {}) {
    const deleteUploadedFileMutation = useMutation<DeleteUploadedFile.TOutput, FetcherErrorResponse, DeleteUploadedFile.TInput>({
        mutationFn: (body) => deleteUploadedFile({ body })
            .then(response => response.data),
        ...params,
    });

    const handleFileDelete = useCallback((upload: UserUploadsEntity) => {
        deleteUploadedFileMutation.mutateAsync({ fileId: upload.id });
    }, []);

    return {
        handleFileDelete,
    };
}