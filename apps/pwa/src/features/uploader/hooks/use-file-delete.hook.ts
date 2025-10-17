import { useMutation } from "@tanstack/react-query";
import { DeleteUploadedFile } from "@/api/user/uploads";
import { useCallback } from "react";
import { UserUploadsEntity } from "@/entities/uploads";
import { DeleteUploadedFileMutation } from "@/features/profile/queries";
import { Mutation } from "@/lib/react-query";

type ConfigParams = Mutation<DeleteUploadedFile.TInput, DeleteUploadedFile.TOutput>;

export function useUploadedFileDelete(params: ConfigParams = {}) {
    const deleteUploadedFileMutation = useMutation({
        ...params,
        ...DeleteUploadedFileMutation,
    });

    return useCallback((upload: UserUploadsEntity) => {
        deleteUploadedFileMutation.mutateAsync({ fileId: upload.id });
    }, []);
}