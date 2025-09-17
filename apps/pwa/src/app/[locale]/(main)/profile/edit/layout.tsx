
import { EditProfileRootLayout } from "@/flows/profile-edit/layouts";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <EditProfileRootLayout>
            {children}
        </EditProfileRootLayout>
    );
};
