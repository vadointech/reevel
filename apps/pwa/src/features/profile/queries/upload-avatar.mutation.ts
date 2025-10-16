import { Mutation } from "@/lib/react-query";
import { uploadProfileAvatar, UploadProfileAvatar } from "@/api/profile";
import { UserUploadsEntity } from "@/entities/uploads";

export const UploadAvatarMutation: Mutation<UploadProfileAvatar.TInput, UserUploadsEntity | null> = {
    mutationFn: async(body) => {
        const { data } = await uploadProfileAvatar({
            body,
        });

        if(!data) return null;

        return data[0];
    },
};