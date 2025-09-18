import { AuthLoginPage } from "@/flows/auth/pages";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function Page() {
    return (
        <AuthLoginPage />
    );
}
