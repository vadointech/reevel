import { Mutation } from "@/lib/react-query";
import { uploadEventPoster, UploadEventPoster } from "@/api/event";

export const UploadEventPosterMutation: Mutation<UploadEventPoster.TInput, UploadEventPoster.TOutput> = {
    mutationFn: (body) => uploadEventPoster({ body }).then(response => response.data),
};