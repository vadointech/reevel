import { useMutation } from "@tanstack/react-query";
import { useSessionStore } from "@/features/session";
import { logout } from "@/api/auth/logout";
import { useRouter } from "@/i18n/routing";

export function useLogout() {
    const sessionStore = useSessionStore();
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            sessionStore.logout();
            router.replace("/login");
        },
    });

    const handleLogout = () => {
        mutate();
    };

    return {
        handleLogout,
    };
}