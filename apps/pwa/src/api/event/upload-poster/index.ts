import { fetcherClient } from "@/api/fetcher-client";
import { UserUploadsEntity } from "@/entities/uploads";

export namespace UploadEventPoster {
    export type TInput = {
        file: Blob;
    };

    export type TOutput = UserUploadsEntity[] | null;

    export const queryKey = ["uploads/event/poster"];
}

export const uploadEventPoster = fetcherClient.fetch<UploadEventPoster.TInput, UploadEventPoster.TOutput>({
    fetcherFunc: (fetcher, input) => {
        const formData = new FormData();

        if(input?.body) {
            const croppedFile = new File([input.body.file], "test.png", { type: "image/png" });
            formData.append("files", croppedFile);
        }

        return fetcher.post("/events/poster", {
            body: formData,
        });
    },
});