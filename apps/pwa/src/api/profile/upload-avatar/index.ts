import { fetcherClient } from "@/api/fetcher-client";
import { UserUploadsEntity } from "@/entities/uploads";
import { UploadEventPoster } from "@/api/event/upload-poster";

export namespace UploadProfileAvatar {
    export type TInput = {
        file: Blob;
    };

    export type TOutput = UserUploadsEntity[];

    export const queryKey = ["uploads/profile/avatar"];
}

export const uploadProfileAvatar = fetcherClient<UploadEventPoster.TInput, UploadEventPoster.TOutput>({
    fetcherFunc: (fetcher, input) => {
        const formData = new FormData();

        if(input?.body) {
            const croppedFile = new File([input.body.file], "test.png", { type: "image/png" });
            formData.append("files", croppedFile);
        }

        return fetcher.post("/profile/picture", {
            body: formData,
        });
    },
});