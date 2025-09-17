import { PropsWithChildren } from "react";

import { ImageUploaderProvider } from "@/features/uploader/image";
import { EditProfileFormProvider } from "@/features/profile/edit";

export namespace EditProfileRootLayout {
    export type Props = PropsWithChildren;
}

export const EditProfileRootLayout = ({
    children,
}: EditProfileRootLayout.Props) => {
    return (
        <EditProfileFormProvider>
            <ImageUploaderProvider>
                {children}
            </ImageUploaderProvider>
        </EditProfileFormProvider>
    );
};
