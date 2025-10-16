import { PropsWithChildren } from "react";

import { ImageUploaderProvider } from "@/features/uploader/image";
import { EditProfileFormProvider } from "@/features/profile/update";

import styles from "../styles/root-layout.module.scss";

export namespace OnboardingRootLayout {
    export type Props = PropsWithChildren;
}

export async function OnboardingRootLayout({ children }: OnboardingRootLayout.Props) {
    return (
        <EditProfileFormProvider>
            <ImageUploaderProvider>
                <div className={styles.layout}>
                    {children}
                </div>
            </ImageUploaderProvider>
        </EditProfileFormProvider>
    );
}
