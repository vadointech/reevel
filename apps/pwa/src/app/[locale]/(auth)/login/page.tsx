import { AuthLoginPage } from "@/flows/auth/pages";

export const dynamic = "force-static";
export const revalidate = false;

export default function Page() {
    return (
        <AuthLoginPage />
    );
}
