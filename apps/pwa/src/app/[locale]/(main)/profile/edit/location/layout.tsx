import { EditProfileLocationPickerLayout } from "@/flows/profile-edit/layouts";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <EditProfileLocationPickerLayout>
            {children}
        </EditProfileLocationPickerLayout>
    );
}