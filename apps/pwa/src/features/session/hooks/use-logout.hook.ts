import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/routing";
import { useSessionContext } from "../session.context";
import { logout } from "@/api/auth";

export function useLogout() {
    const session = useSessionContext();
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: () => logout({}),
        onSuccess: () => {
            session.cleanSession()
                .then(() => router.replace("/login"));
        },
    });

    const handleLogout = () => {
        mutate();
    };

    return {
        handleLogout,
    };
}