import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { deleteUploadedFile, DeleteUploadedFile } from "@/api/user/uploads";
import { FetcherError } from "@/lib/fetcher/error";
import { useCallback } from "react";
import { UserUploadsEntity } from "@/entities/uploads";

type ConfigParams = Omit<UseMutationOptions<DeleteUploadedFile.TOutput, FetcherError, DeleteUploadedFile.TInput>, "mutationFn">;

export function useUploadedFileDelete(params: ConfigParams = {}) {
    const deleteUploadedFileMutation = useMutation<DeleteUploadedFile.TOutput, FetcherError, DeleteUploadedFile.TInput>({
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