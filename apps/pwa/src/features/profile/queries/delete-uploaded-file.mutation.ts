import { Mutation } from "@/lib/react-query";
import { deleteUploadedFile, DeleteUploadedFile } from "@/api/user";

export const DeleteUploadedFileMutation: Mutation<DeleteUploadedFile.TInput, DeleteUploadedFile.TOutput> = {
    mutationFn: (body) => {
        return deleteUploadedFile({ body }).then(response => response.data);
    },
};