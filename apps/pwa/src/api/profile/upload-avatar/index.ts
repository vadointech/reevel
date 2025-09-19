import { fetcherClient } from "@/api/client";
import { UserUploadsEntity } from "@/entities/uploads";
import { UploadEventPoster } from "@/api/event/upload-poster";

export namespace UploadProfileAvatar {
    export type TInput = Blob;

    export type TOutput = UserUploadsEntity[];

    export const queryKey = ["uploads/profile/avatar"];
}

export const uploadProfileAvatar = fetcherClient.fetch<UploadProfileAvatar.TInput, UploadEventPoster.TOutput>({
    fetcherFunc: (fetcher, { body, ...input }) => {
        const formData = new FormData();

        if(body) {
            const croppedFile = new File([body], "test.png", { type: "image/png" });
            formData.append("files", croppedFile);
        }

        return fetcher.post("/profile/picture", {
            body: formData,
            ...input,
        });
    },
});